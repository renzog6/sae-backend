# SAE Backend - Sistema de Administración Empresarial

## 📋 Descripción

SAE Backend es una API REST desarrollada con NestJS y Prisma para gestionar empresas, personas, empleados, ubicaciones, equipos, inspecciones y contactos. La arquitectura está orientada a escalabilidad, con DTOs validados, documentación OpenAPI y pruebas unitarias/e2e.

### 🎯 Características Principales

- **Arquitectura Modular**: Basada en módulos NestJS independientes con responsabilidades claras
- **Autenticación JWT**: Sistema de login con refresh tokens y roles (USER, ADMIN, MANAGER)
- **Base de Datos Relacional**: MySQL con Prisma ORM y migraciones automatizadas
- **Documentación Interactiva**: Swagger/OpenAPI disponible en `/api/docs`
- **Gestión Documental**: Subida y descarga de archivos con organización automática
- **Historial Completo**: Sistema de logs para eventos, incidentes y mantenimiento
- **Polimorfismo Avanzado**: Contactos y direcciones compartidas entre entidades
- **Testing Integral**: Cobertura con Jest para unitarios y e2e

- **Versión**: 1.0.0
- **Autor**: Renzo O. Gorosito
- **Licencia**: MIT

## 🚀 Tecnologías

### Core Framework

- **Framework**: NestJS 10.x con arquitectura modular
- **Lenguaje**: TypeScript con configuración estricta
- **Runtime**: Node.js 18+

### Base de Datos y ORM

- **Base de Datos**: MySQL 8+
- **ORM**: Prisma con migraciones y cliente generado
- **Relaciones**: Soporte completo para relaciones complejas y polimórficas

### Autenticación y Seguridad

- **Autenticación**: JWT con refresh tokens
- **Autorización**: Guards por roles (USER, ADMIN, MANAGER)
- **Rate Limiting**: @nestjs/throttler (10 req/min por defecto)
- **Validación**: class-validator / class-transformer

### Documentación y Testing

- **Documentación**: Swagger/OpenAPI con UI interactiva
- **Testing**: Jest para unitarios y e2e
- **Cobertura**: Configurado para reportes de cobertura

### Utilidades

- **Subida de archivos**: Multer con storage en disco
- **Generación de PDFs**: pdf-lib para documentos dinámicos
- **Fechas**: date-fns para manipulación de fechas
- **Excel**: exceljs para exportación de datos
- **CSV**: csv-parse para importación masiva

## ⚙️ Configuración rápida

### 1. Requisitos del Sistema

- **Node.js**: 18+ (LTS recomendado)
- **MySQL**: 8.0+
- **npm**: 8+ (viene con Node.js)
- **Sistema Operativo**: Windows 10+, macOS, Linux

### 2. Variables de Entorno

Crear archivo `.env` en la raíz del proyecto `sae-backend/`:

```env
# Base de Datos
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/sae_db"

# JWT Configuration
JWT_SECRET="tu_clave_secreta_jwt_muy_segura_aqui"
JWT_EXPIRATION=1d
JWT_REFRESH_SECRET="tu_clave_refresh_muy_segura_aqui"
JWT_REFRESH_EXPIRATION=7d

# Servidor
PORT=3000
API_PREFIX=api
NODE_ENV=development

# Opcionales para producción
# CORS_ORIGIN=https://tu-dominio.com
# UPLOADS_DESTINATION=./uploads
```

### 3. Instalación y Configuración

```bash
# Instalar dependencias
npm install

# Configurar base de datos (automático)
npm run db:setup

# O configuración manual paso a paso:
npx prisma generate    # Genera cliente Prisma
npx prisma migrate dev -n "init"  # Crea y ejecuta migración inicial
npx tsx prisma/seed.ts # Ejecuta datos de prueba
```

### 4. Ejecutar la Aplicación

```bash
# Desarrollo con hot-reload
npm run start:dev

# Producción
npm run build
npm run start:prod

# Modo debug
npm run start:debug
```

### 5. Verificar Instalación

- **API**: http://localhost:3000/api
- **Documentación Swagger**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/health

### 6. Testing

```bash
# Tests unitarios
npm test

# Tests unitarios con cobertura
npm run test:cov

# Tests end-to-end
npm run test:e2e

# Tests en modo debug
npm run test:debug
```

### 7. Docker (Opcional)

```bash
# Construir imagen
docker build -t sae-backend .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env sae-backend
```

## 🏗️ Arquitectura del Sistema

### Diagrama de Módulos

```mermaid
graph TB
    A[App Module] --> B[Auth Module]
    A --> C[Users Module]
    A --> D[Companies Module]
    A --> E[Contacts Module]
    A --> F[Employees Module]
    A --> G[Equipment Module]
    A --> H[Locations Module]
    A --> I[Persons Module]
    A --> J[Documents Module]
    A --> K[History Module]
    A --> L[Inspections Module]
    A --> M[Health Module]
    A --> N[Catalogs Module]

    D --> D1[Business Categories]
    D --> D2[Business Subcategories]

    F --> F1[Employee Categories]
    F --> F2[Employee Positions]
    F --> F3[Employee Vacations]

    G --> G1[Equipment Categories]
    G --> G2[Equipment Types]
    G --> G3[Equipment Models]

    H --> H1[Countries]
    H --> H2[Provinces]
    H --> H3[Cities]
    H --> H4[Addresses]

    I --> I1[Family Relationships]

    K --> K1[Employee Incidents]
    K --> K2[Equipment Maintenance]
    K --> K3[History Logs]

    N --> N1[Brands]
    N --> N2[Units]
```

### Estructura de Directorios

```
src/
├── app.module.ts                 # Módulo raíz de la aplicación
├── main.ts                       # Punto de entrada de la aplicación
├── prisma/
│   ├── prisma.module.ts          # Módulo Prisma
│   ├── prisma.service.ts         # Servicio de base de datos
│   ├── schema.prisma             # Esquema de base de datos
│   └── seed.ts                   # Datos de prueba
├── common/                       # Utilidades compartidas
│   ├── dto/                      # DTOs comunes (PaginationDto)
│   ├── guards/                   # Guards (RolesGuard)
│   ├── decorators/               # Decoradores (Roles, Public)
│   ├── interceptors/             # Interceptores (HttpResponseInterceptor)
│   ├── exceptions/               # Filtros de excepciones
│   └── validators/               # Validadores personalizados
├── auth/                         # Autenticación y autorización
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── guards/ (JwtAuthGuard)
│   ├── strategies/ (JwtStrategy)
│   └── dto/ (LoginDto, RefreshTokenDto)
├── users/                        # Gestión de usuarios del sistema
├── companies/                    # Empresas y categorías
│   ├── companies/
│   ├── business-categories/
│   └── business-subcategories/
├── contacts/                     # Sistema polimórfico de contactos
├── employees/                    # Gestión de empleados
│   ├── employees/
│   ├── employee-categories/
│   ├── employee-positions/
│   └── employee-vacations/
├── locations/                    # Ubicaciones geográficas
│   ├── countries/
│   ├── provinces/
│   ├── cities/
│   └── addresses/
├── persons/                      # Personas físicas
│   ├── persons/
│   └── family/
├── equipment/                    # Gestión de equipos
│   ├── controllers/
│   ├── services/
│   └── dto/
├── catalogs/                     # Catálogos del sistema
│   ├── brands/
│   └── units/
├── inspections/                  # Sistema de inspecciones
├── documents/                    # Gestión documental
├── history/                      # Historial y logs
│   ├── controllers/
│   ├── services/
│   └── dto/
├── health/                       # Health checks
└── uploads/                      # Archivos subidos (generado)
```

## 🌐 API y Documentación

### Prefijos y Endpoints

- **Prefijo Global**: `/${API_PREFIX}` (por defecto `/api`)
- **Base URL**: `http://localhost:3000/api`
- **Documentación Swagger**: `http://localhost:3000/api/docs`
- **Health Check**: `http://localhost:3000/api/health`

### Convenciones de API

#### Respuestas Estandarizadas

**Listados paginados:**

```json
{
  "data": [
    /* array de items */
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "totalPages": 15
  }
}
```

**Operaciones CRUD (detalle/creación/actualización):**

```json
{
  "data": {
    /* objeto individual */
  }
}
```

#### Paginación

- Parámetros: `?page=1&limit=10`
- Implementado con `PaginationDto`
- `skip` calculado automáticamente

#### Enums del Sistema

Los enums se consumen desde `@prisma/client`:

- `Role`: USER, ADMIN, MANAGER
- `EmployeeStatus`: ACTIVE, SUSPENDED, TERMINATED
- `Gender`: MALE, FEMALE, OTHER
- `MaritalStatus`: SINGLE, MARRIED, DIVORCED, WIDOWED
- `ContactType`: EMAIL, PHONE, WHATSAPP, etc.
- `EquipmentStatus`: ACTIVE, INACTIVE, MAINTENANCE, RETIRED

#### Autenticación

Todos los endpoints (excepto auth y health) requieren:

```
Authorization: Bearer <access_token>
```

#### Rate Limiting

- Límite por defecto: 10 requests/minuto
- Configurable en `ThrottlerModule`

## 🗺️ Módulos y Endpoints Principales

### 🔐 Autenticación (`/auth`)

- `POST /auth/login` - Login con email/password
- `POST /auth/refresh` - Refresh access token
- `GET /auth/profile` - Obtener perfil de usuario

### 👥 Usuarios (`/users`) - _Solo ADMIN_

- `POST /users` - Crear usuario
- `GET /users` - Listar usuarios (paginado)
- `GET /users/:id` - Obtener usuario por ID
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### 🏢 Empresas (`/companies`)

- `POST /companies` - Crear empresa _(ADMIN/MANAGER)_
- `GET /companies` - Listar empresas (paginado)
- `GET /companies/:id` - Obtener empresa por ID
- `PATCH /companies/:id` - Actualizar empresa _(ADMIN/MANAGER)_
- `DELETE /companies/:id` - Eliminar empresa _(ADMIN)_

**Categorías de Negocio** (`/companies/categories`)

- `GET /companies/categories` - Listar categorías
- `GET /companies/categories/:id` - Obtener categoría
- `POST /companies/categories` - Crear categoría
- `PATCH /companies/categories/:id` - Actualizar categoría
- `DELETE /companies/categories/:id` - Eliminar categoría

**Subcategorías** (`/companies/subcategories`)

- `GET /companies/subcategories` - Listar subcategorías
- `GET /companies/subcategories/:id` - Obtener subcategoría
- `POST /companies/subcategories` - Crear subcategoría
- `PATCH /companies/subcategories/:id` - Actualizar subcategoría
- `DELETE /companies/subcategories/:id` - Eliminar subcategoría

### 📞 Contactos (`/contacts`)

- `POST /contacts` - Crear contacto (polimórfico)
- `GET /contacts` - Listar contactos (paginado)
- `GET /contacts/company/:companyId` - Contactos de empresa
- `GET /contacts/person/:personId` - Contactos de persona
- `GET /contacts/:id` - Obtener contacto
- `PATCH /contacts/:id` - Actualizar contacto
- `DELETE /contacts/:id` - Eliminar contacto

### 👤 Personas (`/persons`)

- `POST /persons` - Crear persona
- `GET /persons` - Listar personas (paginado)
- `GET /persons/:id` - Obtener persona
- `PATCH /persons/:id` - Actualizar persona
- `DELETE /persons/:id` - Eliminar persona

**Familia** (`/family`)

- `POST /family` - Crear relación familiar
- `GET /family` - Listar relaciones familiares
- `GET /family/:id` - Obtener relación familiar
- `PATCH /family/:id` - Actualizar relación
- `DELETE /family/:id` - Eliminar relación

### 👷 Empleados (`/employees`)

- `POST /employees` - Crear empleado
- `GET /employees` - Listar empleados (paginado)
- `GET /employees/:id` - Obtener empleado
- `PATCH /employees/:id` - Actualizar empleado
- `DELETE /employees/:id` - Eliminar empleado

**Categorías de Empleados** (`/employee-categories`)

- `GET /employee-categories` - Listar categorías
- `POST /employee-categories` - Crear categoría
- `PATCH /employee-categories/:id` - Actualizar categoría
- `DELETE /employee-categories/:id` - Eliminar categoría

**Posiciones** (`/employee-positions`)

- `GET /employee-positions` - Listar posiciones
- `POST /employee-positions` - Crear posición
- `PATCH /employee-positions/:id` - Actualizar posición
- `DELETE /employee-positions/:id` - Eliminar posición

**Vacaciones** (`/employee-vacations`)

- `POST /employee-vacations` - Crear solicitud de vacaciones
- `GET /employee-vacations` - Listar vacaciones (paginado)
- `GET /employee-vacations/:id` - Obtener vacaciones
- `GET /employee-vacations/:id/pdf` - Generar PDF de notificación
- `PATCH /employee-vacations/:id` - Actualizar vacaciones
- `DELETE /employee-vacations/:id` - Eliminar vacaciones
- `GET /employee-vacations/:employeeId/exportVacations/excel` - Exportar a Excel
- `GET /employee-vacations/exportEmployees/excel` - Exportar empleados a Excel

### 📍 Ubicaciones (`/locations`)

**Países** (`/locations/countries`)

- `GET /locations/countries` - Listar países
- `GET /locations/countries/:id` - Obtener país
- `GET /locations/countries/:id/provinces` - Provincias del país
- `POST /locations/countries` - Crear país
- `PATCH /locations/countries/:id` - Actualizar país
- `DELETE /locations/countries/:id` - Eliminar país

**Provincias** (`/locations/provinces`)

- `GET /locations/provinces` - Listar provincias
- `GET /locations/provinces/:id` - Obtener provincia
- `GET /locations/provinces/code/:code` - Provincia por código
- `GET /locations/provinces/country/:countryId` - Provincias de país
- `POST /locations/provinces` - Crear provincia
- `PATCH /locations/provinces/:id` - Actualizar provincia
- `DELETE /locations/provinces/:id` - Eliminar provincia

**Ciudades** (`/locations/cities`)

- `GET /locations/cities` - Listar ciudades
- `GET /locations/cities/:id` - Obtener ciudad
- `GET /locations/cities/province/:provinceId` - Ciudades de provincia
- `GET /locations/cities/postal-code/:postalCode` - Ciudad por código postal
- `POST /locations/cities` - Crear ciudad
- `PATCH /locations/cities/:id` - Actualizar ciudad
- `DELETE /locations/cities/:id` - Eliminar ciudad

**Direcciones** (`/locations/addresses`)

- `GET /locations/addresses` - Listar direcciones
- `GET /locations/addresses/:id` - Obtener dirección
- `GET /locations/addresses/city/:cityId` - Direcciones de ciudad
- `GET /locations/addresses/company/:companyId` - Direcciones de empresa
- `GET /locations/addresses/person/:personId` - Direcciones de persona
- `POST /locations/addresses` - Crear dirección
- `POST /locations/addresses/person/:personId` - Crear dirección para persona
- `POST /locations/addresses/company/:companyId` - Crear dirección para empresa
- `PATCH /locations/addresses/:id` - Actualizar dirección
- `DELETE /locations/addresses/:id` - Eliminar dirección

### 🔧 Equipos (`/equipment`)

- `POST /equipment` - Crear equipo _(ADMIN/MANAGER)_
- `GET /equipment` - Listar equipos (paginado)
- `GET /equipment/:id` - Obtener equipo
- `PATCH /equipment/:id` - Actualizar equipo _(ADMIN/MANAGER)_
- `DELETE /equipment/:id` - Eliminar equipo _(ADMIN)_

**Categorías** (`/equipment-categories`)

- `GET /equipment-categories` - Listar categorías
- `POST /equipment-categories` - Crear categoría
- `PATCH /equipment-categories/:id` - Actualizar categoría
- `DELETE /equipment-categories/:id` - Eliminar categoría

**Tipos** (`/equipment-types`)

- `GET /equipment-types` - Listar tipos
- `GET /equipment-types/category/:categoryId` - Tipos de categoría
- `POST /equipment-types` - Crear tipo
- `PATCH /equipment-types/:id` - Actualizar tipo
- `DELETE /equipment-types/:id` - Eliminar tipo

**Modelos** (`/equipment-models`)

- `GET /equipment-models` - Listar modelos
- `GET /equipment-models/type/:typeId` - Modelos de tipo
- `POST /equipment-models` - Crear modelo
- `PATCH /equipment-models/:id` - Actualizar modelo
- `DELETE /equipment-models/:id` - Eliminar modelo

**Endpoints Auxiliares:**

- `GET /equipment/categories/all` - Todas las categorías
- `GET /equipment/types/all` - Todos los tipos
- `GET /equipment/models/all` - Todos los modelos

### 📋 Inspecciones (`/inspections`)

- `GET /inspections` - Listar inspecciones (paginado)
- `GET /inspections/:id` - Obtener inspección
- `GET /inspections/types` - Listar tipos de inspección

### 📄 Documentos (`/documents`)

- `POST /documents/upload` - Subir archivo
- `GET /documents` - Listar documentos
- `GET /documents/:id` - Obtener documento
- `GET /documents/:id/download` - Descargar archivo
- `PUT /documents/:id` - Actualizar documento
- `DELETE /documents/:id` - Eliminar documento

### 🏷️ Catálogos (`/catalogs`)

**Marcas** (`/brands`)

- `GET /brands` - Listar marcas
- `POST /brands` - Crear marca _(ADMIN/MANAGER)_
- `PATCH /brands/:id` - Actualizar marca _(ADMIN/MANAGER)_
- `DELETE /brands/:id` - Eliminar marca _(ADMIN)_

**Unidades** (`/units`)

- `GET /units` - Listar unidades
- `POST /units` - Crear unidad _(ADMIN/MANAGER)_
- `PATCH /units/:id` - Actualizar unidad _(ADMIN/MANAGER)_
- `DELETE /units/:id` - Eliminar unidad _(ADMIN)_

### 📊 Historial (`/history`)

**Logs de Empleados** (`/employees/:employeeId/history`)

- `POST /employees/:employeeId/history/incidents` - Crear incidente
- `GET /employees/:employeeId/history` - Historial del empleado

**Incidentes de Empleados** (`/employee-incidents`)

- `POST /employee-incidents` - Crear incidente
- `GET /employee-incidents/employee/:employeeId` - Incidentes de empleado
- `PATCH /employee-incidents/:id` - Actualizar incidente
- `DELETE /employee-incidents/:id` - Eliminar incidente

**Mantenimiento de Equipos** (`/equipment/:equipmentId/history`)

- `POST /equipment/:equipmentId/history/maintenance` - Crear mantenimiento

### 🏥 Salud (`/health`)

- `GET /health` - Health check _(público)_

## 📄 Sistema de Gestión Documental

### Características Principales

- **Subida de archivos**: Soporte para múltiples formatos
- **Organización automática**: Carpetas por entidad (empleados/empresas)
- **Descarga segura**: Control de acceso por autenticación
- **Metadatos**: Descripción, tipo MIME, tamaño, fecha de subida
- **Límite de tamaño**: 10MB por archivo por defecto

### Endpoint de Subida

```
POST /api/documents/upload
```

**Headers requeridos:**

```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Campos del formulario:**

- `file` _(requerido)_: Archivo binario
- `description` _(opcional)_: Descripción del documento (máx. 500 caracteres)
- `employeeId` _(opcional)_: ID del empleado
- `companyId` _(opcional)_: ID de la empresa

**Reglas de validación:**

- ✅ Debe especificarse exactamente uno: `employeeId` O `companyId`
- ✅ Archivo requerido
- ✅ Tamaño máximo: 10MB
- ✅ Tipos de archivo permitidos: Todos (validación extensible)

### Estructura de Organización

Los archivos se organizan automáticamente en carpetas por entidad:

**Empleados:** `src/uploads/employees/<apellido>_<nombre>_<dni>/`

```
src/uploads/employees/
├── gomez_juan_12345678/
│   ├── 1730000000000-12345.pdf
│   └── 1730000000001-67890.docx
└── perez_maria_87654321/
    └── 1730000000002-11111.jpg
```

**Empresas:** `src/uploads/companies/<nombre>_<cuit>/`

```
src/uploads/companies/
├── acme_sa_30-12345678-9/
│   ├── 1730000000003-22222.pdf
│   └── 1730000000004-33333.xlsx
└── tech_corp_30-98765432-1/
    └── 1730000000005-44444.png
```

### Endpoints CRUD

- `GET /api/documents` - Listar documentos (con filtros)
- `GET /api/documents/:id` - Obtener metadatos del documento
- `GET /api/documents/:id/download` - Descargar archivo
- `PUT /api/documents/:id` - Actualizar metadatos
- `DELETE /api/documents/:id` - Eliminar documento y archivo

### Ejemplos de Uso

**Subida con cURL (PowerShell):**

```powershell
curl.exe -X POST "http://localhost:3000/api/documents/upload" `
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." `
  -F "file=@C:\path\to\document.pdf" `
  -F "description=Contrato de trabajo firmado" `
  -F "employeeId=1"
```

**Subida con cURL (Bash):**

```bash
curl -X POST "http://localhost:3000/api/documents/upload" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "file=@/path/to/document.pdf" \
  -F "description=Contrato de servicios" \
  -F "companyId=1"
```

**Descarga de archivo:**

```bash
curl -X GET "http://localhost:3000/api/documents/123/download" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  --output downloaded_file.pdf
```

### Consideraciones Técnicas

- **Rutas relativas**: Las rutas se almacenan relativas al directorio raíz del proyecto
- **Limpieza automática**: Los archivos se eliminan del disco al borrar el registro
- **Nombres únicos**: Timestamp + random para evitar colisiones
- **Validación extensible**: Fácil agregar validaciones de tipo/mime adicionales

## 🗄️ Base de Datos y Prisma ORM

### Arquitectura de Datos

El sistema utiliza **MySQL 8+** con **Prisma ORM** para una gestión robusta de datos relacionales complejos.

#### Modelos Principales

```mermaid
erDiagram
    User ||--o{ Company : manages
    Company ||--o{ Employee : employs
    Company ||--o{ Equipment : owns
    Company ||--o{ Contact : has
    Company ||--o{ Address : located
    Company ||--o{ Document : stores

    Person ||--o{ Employee : is
    Person ||--o{ Contact : has
    Person ||--o{ Address : lives
    Person ||--|| Family : related

    Employee ||--o{ EmployeeVacation : takes
    Employee ||--o{ Document : owns
    Employee ||--o{ Inspection : performs

    Equipment ||--o{ Inspection : undergoes
    Equipment ||--o{ EquipmentMaintenance : receives
    Equipment ||--o{ Document : has

    Country ||--|{ Province : contains
    Province ||--|{ City : contains
    City ||--|{ Address : has

    BusinessCategory ||--|{ BusinessSubCategory : categorizes
    EquipmentCategory ||--|{ EquipmentType : groups
    EquipmentType ||--|{ EquipmentModel : defines
```

#### Enums del Sistema

- **Role**: USER, ADMIN, MANAGER
- **EmployeeStatus**: ACTIVE, SUSPENDED, TERMINATED
- **Gender**: MALE, FEMALE, OTHER
- **MaritalStatus**: SINGLE, MARRIED, DIVORCED, WIDOWED
- **PersonStatus**: ACTIVE, INACTIVE
- **ContactType**: EMAIL, PHONE, WHATSAPP, TELEGRAM, etc.
- **EquipmentStatus**: ACTIVE, INACTIVE, MAINTENANCE, RETIRED
- **VacationType**: ASSIGNED, TAKEN
- **HistoryType**: EMPLOYEE_ILLNESS, EQUIPMENT_MAINTENANCE, etc.
- **SeverityLevel**: INFO, WARNING, CRITICAL, SUCCESS

### Optimización de Performance

#### Índices Estratégicos

Se han implementado índices específicos para consultas frecuentes:

**Empleados:**

- `EmployeeCategory(name, code)`
- `EmployeePosition(name, code)`
- `EmployeeVacation(year, startDate, endDate)`
- `Employee(companyId, categoryId, status)`

**Personas:**

- `Person(lastName, firstName)`
- `Person(dni, cuil)`

**Equipos:**

- `Equipment(companyId, categoryId, typeId, modelId, year)`

**Ubicaciones:**

- `Province(countryId)`
- `City(provinceId, postalCode)`
- `Address(cityId, personId, companyId)`

**Historial:**

- `HistoryLog(employeeId, companyId, equipmentId, personId, type, eventDate)`

#### Migraciones

```bash
# Crear nueva migración
npx prisma migrate dev -n "descripcion_del_cambio"

# Aplicar migraciones en producción
npx prisma migrate deploy

# Resetear base de datos (desarrollo)
npm run db:reset
```

### Seeds y Datos de Prueba

El sistema incluye datos de prueba completos:

```bash
# Ejecutar seeds
npm run prisma:seed

# O setup completo
npm run db:setup
```

**Datos incluidos:**

- Usuarios de prueba (admin, manager, user)
- Países, provincias y ciudades argentinas
- Categorías de negocio y subcategorías
- Empresas de ejemplo
- Empleados con diferentes categorías y posiciones
- Equipos con jerarquía completa
- Contactos y direcciones
- Documentos de ejemplo

### Comandos Útiles de Prisma

```bash
# Generar cliente Prisma
npm run prisma:generate

# Abrir Prisma Studio (GUI)
npm run prisma:studio

# Validar esquema
npx prisma validate

# Formatear esquema
npx prisma format
```

## 🔐 Sistema de Autenticación

### Arquitectura JWT

El sistema implementa autenticación JWT con refresh tokens para seguridad óptima:

- **Access Token**: Vida corta (1 día), usado para requests autenticados
- **Refresh Token**: Vida larga (7 días), usado para renovar access tokens
- **Guards**: Protección por roles en endpoints específicos

### Endpoints de Autenticación

```bash
# Login
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}

# Response
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "ADMIN"
  }
}

# Refresh Token
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

# Get Profile
GET /api/auth/profile
Authorization: Bearer <access_token>
```

### Uso de Tokens

Para acceder a endpoints protegidos, incluir el header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Sistema de Roles

| Rol         | Descripción    | Permisos                                  |
| ----------- | -------------- | ----------------------------------------- |
| **USER**    | Usuario básico | Lectura general, operaciones propias      |
| **MANAGER** | Gerente        | Crear/editar empresas, equipos, empleados |
| **ADMIN**   | Administrador  | Control total del sistema                 |

### Guards y Decoradores

```typescript
// Protección por autenticación
@UseGuards(JwtAuthGuard)

// Protección por roles
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER)

// Decoradores personalizados
@Roles(Role.ADMIN)
@Post('users')
createUser() { ... }
```

### Seguridad Adicional

- **Rate Limiting**: 10 requests/minuto por defecto
- **Validación de DTOs**: Con class-validator
- **Hashing de passwords**: bcrypt con salt rounds
- **Logs de autenticación**: Seguimiento de login/logout fallidos

## 🧪 Testing y Calidad de Código

### Estrategia de Testing

El proyecto implementa una estrategia integral de testing con **Jest**:

- **Unit Tests**: Cobertura de servicios, utilidades y lógica de negocio
- **E2E Tests**: Flujos completos de API con base de datos de prueba
- **Integration Tests**: Módulos y dependencias entre servicios

### Ejecutar Tests

```bash
# Tests unitarios
npm test

# Tests unitarios con watch mode
npm run test:watch

# Tests unitarios con cobertura
npm run test:cov

# Tests end-to-end
npm run test:e2e

# Tests en modo debug
npm run test:debug
```

### Configuración de Jest

**Unit Tests** (`jest.config.js`):

```javascript
module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};
```

**E2E Tests** (`test/jest-e2e.json`):

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "test",
  "testEnvironment": "./test/utils/TestEnvironment.ts",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "moduleNameMapping": {
    "^src/(.*)$": "<rootDir>/../src/$1"
  }
}
```

### Cobertura de Tests

Después de ejecutar `npm run test:cov`, revisar el reporte en `coverage/lcov-report/index.html`

**Métricas objetivo:**

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 85%
- **Lines**: > 80%

### Tests E2E Incluidos

- **Auth**: Login, refresh tokens, guards
- **Users**: CRUD completo
- **Companies**: Gestión con roles
- **Employees**: Ciclo completo con vacaciones
- **Equipment**: Jerarquía y relaciones
- **Locations**: Ubicaciones geográficas
- **Documents**: Subida y descarga

### Buenas Prácticas de Testing

```typescript
// Ejemplo de test unitario
describe("CompaniesService", () => {
  let service: CompaniesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CompaniesService, PrismaService],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should create a company", async () => {
    const dto = { name: "Test Company", cuit: "30-12345678-9" };
    const result = await service.create(dto);
    expect(result.name).toBe(dto.name);
  });
});
```

### Linting y Formateo

```bash
# Ejecutar ESLint
npm run lint

# Formatear código
npm run format

# Verificar tipos TypeScript
npx tsc --noEmit
```

## 🤝 Desarrollo y Contribución

### Guías de Desarrollo

#### Estructura de Módulos

Cada módulo sigue el patrón estándar de NestJS:

```
src/modules/[module-name]/
├── [module-name].module.ts      # Declaración del módulo
├── [module-name].controller.ts  # Endpoints HTTP
├── [module-name].service.ts     # Lógica de negocio
├── dto/                         # Data Transfer Objects
│   ├── create-[entity].dto.ts
│   ├── update-[entity].dto.ts
│   └── [entity].dto.ts
├── entities/                    # Entidades (si no se usa Prisma)
└── [module-name].spec.ts        # Tests unitarios
```

#### Patrones Implementados

1. **Repository Pattern**: Abstraído por Prisma ORM
2. **DTO Pattern**: Validación con class-validator
3. **Guard Pattern**: Autorización por roles
4. **Interceptor Pattern**: Transformación de respuestas
5. **Exception Filter**: Manejo centralizado de errores

#### Convenciones de Código

- **Nombres de archivos**: kebab-case para archivos, PascalCase para clases
- **Imports**: Agrupados por tipo (NestJS, terceros, locales)
- **Enums**: Usar siempre desde `@prisma/client`
- **DTOs**: Validar con decoradores de class-validator
- **Services**: Inyectar dependencias en constructor
- **Controllers**: Usar decoradores de Swagger para documentación

#### Ejemplo de Módulo

```typescript
// companies/companies.controller.ts
@ApiTags("companies")
@Controller("companies")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Create company" })
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.create(dto).then((data) => ({ data }));
  }
}
```

### Flujo de Trabajo

1. **Crear rama**: `git checkout -b feature/nueva-funcionalidad`
2. **Desarrollar**: Seguir convenciones y patrones
3. **Testing**: Ejecutar tests y verificar cobertura
4. **Linting**: `npm run lint` y `npm run format`
5. **Commit**: Mensajes descriptivos en inglés
6. **Push**: `git push origin feature/nueva-funcionalidad`
7. **PR**: Crear Pull Request con descripción detallada

### Pull Requests

**Template de PR:**

```markdown
## Descripción

Breve descripción de los cambios

## Tipo de cambio

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tests unitarios pasan
- [ ] Tests E2E pasan
- [ ] Cobertura > 80%

## Checklist

- [ ] Linting pasa
- [ ] Tipos TypeScript correctos
- [ ] Documentación actualizada
- [ ] Migraciones de BD si aplica
```

### Configuración de Desarrollo

**VS Code recomendado:**

- Extensiones: TypeScript, Prettier, ESLint
- Settings: Formateo automático al guardar

**Pre-commit hooks** (opcional):

```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run test"
```

## 🚀 Despliegue y Producción

### Docker

#### Construcción de Imagen

```dockerfile
# Dockerfile optimizado para producción
FROM node:22-alpine AS base
RUN apk add --no-cache openssl ca-certificates curl && corepack enable

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --ignore-scripts --loglevel=error

FROM base AS builder
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/assets ./assets

USER nestjs
ENV NODE_ENV=production PORT=3005
EXPOSE 3005

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3005/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

CMD ["node", "dist/src/main.js"]
```

#### Comandos Docker

```bash
# Construir imagen
docker build -t sae-backend .

# Ejecutar contenedor
docker run -p 3000:3005 --env-file .env sae-backend

# Con Docker Compose
docker-compose up -d
```

### Variables de Producción

```env
# Producción
NODE_ENV=production
DATABASE_URL="mysql://user:pass@prod-host:3306/sae_prod"
JWT_SECRET="clave_super_segura_produccion"
JWT_REFRESH_SECRET="refresh_clave_super_segura"
PORT=3005
API_PREFIX=api

# Opcionales
CORS_ORIGIN=https://tu-dominio.com
UPLOADS_DESTINATION=./uploads
LOG_LEVEL=warn
```

### Health Checks

- **Endpoint**: `GET /api/health`
- **Respuesta**: `{ "status": "ok", "timestamp": "2025-01-15T10:30:00.000Z" }`
- **Docker**: Health check automático cada 30s

### Monitoreo y Logs

```typescript
// Logging configurado en main.ts
const app = await NestFactory.create(AppModule, {
  logger:
    process.env.NODE_ENV === "production"
      ? ["error", "warn", "log"]
      : ["error", "warn", "log", "debug", "verbose"],
});
```

### Optimizaciones de Producción

- **Compression**: Gzip automático
- **Rate Limiting**: Configurable por entorno
- **Database Connection Pool**: Prisma optimizado
- **File Upload Limits**: Configurables
- **CORS**: Restringido a dominios específicos

## 📊 Métricas y Monitoreo

### Endpoints de Monitoreo

- `GET /api/health` - Health check básico
- `GET /api/health/ready` - Readiness probe
- `GET /api/health/live` - Liveness probe

### Logs Estructurados

```json
{
  "level": "info",
  "message": "User logged in",
  "userId": 123,
  "email": "user@example.com",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "correlationId": "abc-123-def"
}
```

## 🔧 Troubleshooting

### Problemas Comunes

**Error de conexión a BD:**

```bash
# Verificar variables de entorno
echo $DATABASE_URL

# Test de conexión
npx prisma db push --preview-feature
```

**Errores de autenticación:**

- Verificar JWT_SECRET en variables de entorno
- Comprobar expiración de tokens (1d access, 7d refresh)

**Problemas de subida de archivos:**

- Verificar permisos de carpeta `src/uploads/`
- Comprobar límites de tamaño (10MB por defecto)

**Tests fallando:**

```bash
# Limpiar cache de Jest
npx jest --clearCache

# Ejecutar tests específicos
npm test -- --testNamePattern="CompaniesService"
```

## 📄 Licencia

MIT - Ver archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

Desarrollado con ❤️ usando **NestJS** + **Prisma** + **TypeScript**

**Tecnologías principales:**

- [NestJS](https://nestjs.com/) - Framework Node.js progresivo
- [Prisma](https://prisma.io/) - ORM de nueva generación
- [MySQL](https://mysql.com/) - Base de datos relacional
- [JWT](https://jwt.io/) - Autenticación segura
- [Swagger](https://swagger.io/) - Documentación API

**Contribuciones bienvenidas** 🚀
