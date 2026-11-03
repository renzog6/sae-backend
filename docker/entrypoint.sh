#!/bin/sh
set -e

echo "⏳ Waiting for MySQL..."
until nc -z sae-mysql 3306; do
  sleep 2
done

echo "✅ MySQL is ready"

# Aplica las migraciones pendientes antes de arrancar. Es idempotente: si no hay
# nada nuevo, no hace nada. Ya no se usa `db push` (generaría drift contra el
# historial de migraciones).
echo "📦 Applying pending Prisma migrations"
npx prisma migrate deploy

echo "🚀 Starting backend"
exec node dist/src/main.js
