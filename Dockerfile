# Dockerfile para SAE-Backend con Node.js 22 Alpine
FROM node:22-alpine AS base

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache \
    openssl \
    ca-certificates \
    curl \
    && corepack enable

WORKDIR /app

# Stage de dependencias de producción
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --ignore-scripts --loglevel=error

# Stage de dependencias de desarrollo para build
FROM base AS deps-dev
COPY package.json package-lock.json* ./
RUN npm install --include=dev --loglevel=error

# Stage de build
FROM base AS builder
WORKDIR /app
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .
# Generar el cliente Prisma ANTES del build
RUN npx prisma generate
RUN npm run build

# Stage de producción con cliente Prisma generado
FROM base AS runner
WORKDIR /app

# Crear usuario y grupo no root
RUN addgroup -g 1001 -S nodejs \
    && adduser -S -u 1001 -G nodejs nestjs

# Copiar archivos necesarios con los permisos correctos
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma

# Variables de entorno
USER nestjs
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Comando de inicio
CMD ["node", "dist/main"]