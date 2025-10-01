# SAE Backend - Sistema de Administración Empresarial

## 📋 Descripción

SAE Backend es una API REST desarrollada con NestJS y Prisma para gestionar empresas, personas, empleados, ubicaciones, equipos, inspecciones y contactos. La arquitectura está orientada a escalabilidad, con DTOs validados, documentación OpenAPI y pruebas unitarias/e2e.

- **Versión**: 1.0.0
- **Autor**: Renzo O. Gorosito
- **Licencia**: MIT

## 🚀 Tecnologías

- Framework: NestJS 10.x
- Base de Datos: MySQL + Prisma ORM
- Autenticación: JWT con refresh tokens (guards por módulo cuando aplica)
- Rate Limiting: @nestjs/throttler (10 req/min por defecto)
- Documentación: Swagger (OpenAPI)
- Validación: class-validator / class-transformer
- Testing: Jest (unit y e2e)
- Subida de archivos: Multer
- Generación de PDFs: pdf-lib
- Lenguaje: TypeScript

## ⚙️ Configuración rápida

1. Requisitos

- Node 18+
- MySQL 8+

2. Variables de entorno (crear `.env` en `sae-backend/`)

```
DATABASE_URL="mysql://user:pass@localhost:3306/sae"
JWT_SECRET="changeme"
JWT_EXPIRATION=1d
JWT_REFRESH_SECRET="changeme_refresh"
JWT_REFRESH_EXPIRATION=7d
PORT=3000
API_PREFIX=api
```

3. Instalar dependencias y preparar base

```
npm install
npm run db:setup  # Genera cliente Prisma, migra DB y ejecuta seed
```

O manualmente:

```
npx prisma generate
npx prisma migrate dev -n "init"
npx tsx prisma/seed.ts
```

4. Ejecutar aplicación

```
npm run start:dev
```

5. Pruebas

```
npm test           # unit
npm run test:e2e   # end-to-end
```

## 📁 Estructura principal

```
src/
├── app.module.ts
├── main.ts
├── prisma/
│   ├── prisma.module.ts
│   ├── prisma.service.ts
│   ├── schema.prisma
│   └── seed.ts
├── common/
│   ├── dto/ (PaginationDto, etc.)
│   ├── guards/ (RolesGuard)
│   ├── decorators/ (Roles, Public)
│   ├── interceptors/ (HttpResponseInterceptor)
│   ├── exceptions/ (HttpExceptionFilter)
│   └── validators/ (ExactlyOneOf)
├── auth/
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── guards/ (JwtAuthGuard)
│   ├── strategies/ (JwtStrategy)
│   └── dto/ (LoginDto, RefreshTokenDto)
├── users/
├── companies/ (companies, business-categories, business-subcategories)
├── contacts/
├── employees/ (employees, employee-categories, employee-positions, employee-vacations)
├── locations/ (countries, provinces, cities, addresses)
├── persons/ (persons, family)
├── equipment/
├── catalogs/ (brands, units)
├── inspections/
├── documents/
├── health/
└── uploads/ (carpeta para archivos subidos)
```

## 🌐 Prefijo API y Swagger

- Prefijo global: `/${API_PREFIX}` (por defecto `/api`)
- Swagger UI: `http://localhost:3000/${API_PREFIX}/docs`

## 📦 Convenciones de API

- Respuestas de lectura:
  - Listados paginados: `{ data: T[], meta: { total, page, limit, totalPages } }`
  - Detalles/creación/actualización: `{ data: T }`
- Paginación: `?page=1&limit=10` (usa `PaginationDto` con `skip` derivado)
- Enums: se consumen desde `@prisma/client` (p.ej. `EmployeeStatus`, `Gender`, etc.)

## 🗺️ Módulos y endpoints destacados

- Ubicaciones (`/locations`)
  - Countries: `GET /countries`, `GET /countries/:id/provinces`
  - Provinces: `GET /provinces`, `GET /provinces/:id`, `GET /provinces/code/:code`
  - Cities: `GET /cities`, `GET /cities/:id`, `GET /cities/province/:provinceId`, `GET /cities/postal-code/:postalCode`, `POST`, `PATCH`, `DELETE`
  - Addresses: `GET /addresses`, `GET /addresses/:id`, `GET /addresses/city/:cityId`, `GET /addresses/company/:companyId`, `POST /addresses`, `PATCH /addresses/:id`, `DELETE /addresses/:id`
    - Nuevos helpers para creación:
      - `POST /addresses/person/:personId`
      - `POST /addresses/company/:companyId`

- Empresas (`/companies`)
  - `POST /companies` (ADMIN/MANAGER)
  - `GET /companies` (paginación)
  - `GET /companies/:id`
  - `PATCH /companies/:id` (ADMIN/MANAGER)
  - `DELETE /companies/:id` (ADMIN)
  - Reglas actuales de create/update: sólo aceptan `cuit`, `name`, `businessName`, `information` y `businessCategoryId`. Las relaciones (direcciones, contactos, etc.) se gestionan por endpoints dedicados.

- Contactos (`/contacts`, requiere JWT y roles en la mayoría de endpoints)
  - `POST /contacts` (acepta `companyId` y/o `personId` y crea los `ContactLink` asociados)
  - `GET /contacts` (paginación)
  - `GET /contacts/company/:companyId` (paginación)
  - `GET /contacts/:id`, `PATCH /contacts/:id`, `DELETE /contacts/:id`

- Personas (`/persons`) y Familia (`/family`)
  - Personas: CRUD con enums de Prisma (`Gender`, `MaritalStatus`, `PersonStatus`). Listado paginado.
  - Family: CRUD (relaciones de parentesco entre personas). Listado simple.

- Empleados (`/employees`)
  - Employees: CRUD + listado paginado.
  - Employee Categories/Positions/Vacations: CRUD + listados paginados (vacations incluye `employee`).
  - Employee Vacations: adicionalmente GET /employee-vacations/:id/pdf (genera PDF de notificación de vacaciones usando pdf-lib).

- Catálogos (`/brands`, `/units`): CRUD y listados.
- Equipos (`/equipment`): CRUD y listados, con endpoints auxiliares para categorías/tipos/modelos (`/equipment/categories/all`, `/equipment/types/all`, `/equipment/models/all`).
- Inspecciones (`/inspections`): GET /inspections (paginación), GET /inspections/:id, GET /inspections/types.
- Usuarios (`/users`): CRUD de usuarios (solo ADMIN).
- Salud (`/health`): GET /health (health check público).
- Documentos (`/documents`): POST /documents/upload (subida de archivos), GET /documents/:id/download (descarga), CRUD normal.

## 📄 Documentos (uploads)

- Endpoint: `POST /${API_PREFIX}/documents/upload`
- Autenticación: `Authorization: Bearer <token>`
- Consumes: `multipart/form-data`
- Campos del formulario:
  - `file`: archivo binario (requerido)
  - `description`: texto (opcional, máx. 500)
  - `employeeId`: entero (opcional)
  - `companyId`: entero (opcional)

- Reglas de validación:
  - Debe especificarse exactamente uno de `employeeId` o `companyId`.
  - Si se pasa `employeeId`, el archivo se organiza en la carpeta del empleado.
  - Si se pasa `companyId`, el archivo se organiza en la carpeta de la empresa.

- Estructura de carpetas en `src/uploads/`:
  - Empleados: `src/uploads/employees/<apellido_nombre_dni>/`
  - Empresas: `src/uploads/companies/<nombre_cuit>/`
  - Ejemplos:
    - `src/uploads/employees/gomez_juan_12345678/1730000000000-12345.pdf`
    - `src/uploads/companies/acme_sa_30-12345678-9/1730000000000-67890.pdf`

- Ruta almacenada en DB (`Document.path`): relativa al root del proyecto (ej.: `src/uploads/employees/...`).

- Ejemplos de uso
  - PowerShell (usar `curl.exe`):
    ```powershell
    curl.exe -X POST "http://localhost:3000/api/documents/upload" \
      -H "Authorization: Bearer <TOKEN>" \
      -F "file=@C:\workspace-nextjs\sae-web-ia\sae-backend\README.md" \
      -F "description=Contrato firmado" \
      -F "employeeId=1"
    ```
  - Bash/Git Bash:
    ```bash
    curl -X POST "http://localhost:3000/api/documents/upload" \
      -H "Authorization: Bearer <TOKEN>" \
      -F "file=@/c/workspace-nextjs/sae-web-ia/sae-backend/README.md" \
      -F "description=Contrato firmado" \
      -F "companyId=1"
    ```

## 🧱 Prisma y performance

- Esquema: `prisma/schema.prisma` (modelos principales: User, Company, Person, Employee, Equipment, etc.)
- Enums: Role, ContactType, EmployeeStatus, Gender, MaritalStatus, PersonStatus, VacationType, etc.
- Índices añadidos para mejorar consultas frecuentes (no-únicos):
  - `EmployeeCategory(name, code)`, `EmployeePosition(name, code)`
  - `EmployeeVacation(year)`, `EmployeeVacation(startDate)`
  - `Person(lastName)`, `Person(firstName)`
  - Y otros en campos de búsqueda comunes
- Ejecutar migraciones tras cambios de esquema:

```
npx prisma migrate dev -n "add_indexes_for_perf"
```

## 🔐 Autenticación

- Login en `/auth/login` (POST con email/password).
- Refresh token en `/auth/refresh` (POST con refreshToken).
- Profile en `/auth/profile` (GET, requiere JWT).
- Usar `Authorization: Bearer <token>` donde apliquen guards (ver `contacts`, `companies`, `users`, etc.).
- Roles: USER, ADMIN, MANAGER (definidos en enum Role).

## 🧪 Testing

- Unit: `npm test`
- E2E: `npm run test:e2e`

## 🤝 Contribución

- Convención de respuestas y paginación consistente.
- Usar enums desde `@prisma/client` en DTOs/servicios.
- Abrir PRs con descripción clara y pasos de prueba.

## 📄 Licencia

MIT

---

Desarrollado con ❤️ usando NestJS + Prisma
