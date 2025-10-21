# SAE Backend - Sistema de Administración Empresarial

## 📋 Descripción

SAE Backend es una API REST completa desarrollada con **NestJS** y **Prisma ORM** para la gestión integral de un sistema empresarial. El proyecto implementa un sistema de administración que abarca desde la gestión de recursos humanos hasta el control de flota vehicular y neumáticos, con énfasis en la trazabilidad completa de operaciones.

### 🎯 Características Principales

- **Arquitectura Modular Avanzada**: Más de 40 módulos independientes organizados por dominio
- **Autenticación JWT Robusta**: Sistema de login con refresh tokens y roles jerárquicos (USER, ADMIN, MANAGER)
- **Base de Datos Compleja**: MySQL 8+ con Prisma ORM, más de 50 modelos relacionados y migraciones automatizadas
- **Documentación Interactiva**: Swagger/OpenAPI completa disponible en `/api/docs`
- **Gestión Documental**: Sistema de subida/descarga de archivos con organización automática por entidad
- **Historial Auditado**: Sistema de logs polimórfico para eventos, incidentes y mantenimiento
- **Polimorfismo Avanzado**: Contactos y direcciones compartidas entre múltiples entidades
- **Testing Exhaustivo**: Cobertura completa con Jest para unitarios y e2e
- **Gestión de Neumáticos**: Módulo especializado para ciclo de vida completo de neumáticos
- **Sistema de Inspecciones**: Control técnico de equipos y neumáticos
- **Reportes Analíticos**: Generación de reportes Excel y métricas de rendimiento

- **Versión**: 1.0.0
- **Autor**: Renzo O. Gorosito
- **Licencia**: MIT
- **Última Actualización**: Octubre 2025

## 🚀 Tecnologías

### Core Framework

- **Framework**: NestJS 10.x con arquitectura modular avanzada
- **Lenguaje**: TypeScript 5.1+ con configuración estricta (strict mode)
- **Runtime**: Node.js 18+ LTS
- **Gestión de Dependencias**: npm 8+ con package-lock.json

### Base de Datos y ORM

- **Base de Datos**: MySQL 8.0+
- **ORM**: Prisma 6.17+ con cliente generado automáticamente
- **Migraciones**: Sistema automatizado de migraciones de base de datos
- **Relaciones**: Soporte completo para relaciones N:M, 1:N, polimórficas y complejas
- **Índices**: Optimización con índices estratégicos en campos de búsqueda frecuente

### Autenticación y Seguridad

- **Autenticación**: JWT con refresh tokens (access: 1d, refresh: 7d)
- **Autorización**: Guards por roles jerárquicos (USER, ADMIN, MANAGER)
- **Rate Limiting**: @nestjs/throttler (10 req/min por defecto, configurable)
- **Validación**: class-validator + class-transformer con transformación automática
- **Hashing**: bcrypt con salt rounds para passwords
- **CORS**: Configurado para desarrollo y producción

### Documentación y Testing

- **Documentación**: Swagger/OpenAPI 7.4+ con UI interactiva completa
- **Testing**: Jest 29+ para unitarios y e2e con configuración dedicada
- **Cobertura**: Reportes de cobertura configurados (>80% objetivo)
- **E2E**: Tests end-to-end con base de datos de prueba

### Utilidades y Librerías

- **Subida de archivos**: Multer con storage en disco y límites configurables (10MB)
- **Generación de PDFs**: pdf-lib para documentos dinámicos (notificaciones de vacaciones)
- **Fechas**: date-fns para manipulación robusta de fechas
- **Excel**: exceljs para exportación de reportes y datos
- **CSV**: csv-parse para importación masiva de datos
- **Compresión**: Gzip automático en respuestas
- **Logging**: Winston/NestJS logger con niveles configurables

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

### Diagrama de Módulos Actualizado

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
    A --> O[Tires Module]
    A --> P[Prisma Module]

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

    O --> O1[Tire Sizes]
    O --> O2[Tire Models]
    O --> O3[Tire Assignments]
    O --> O4[Tire Rotations]
    O --> O5[Tire Recaps]
    O --> O6[Tire Inspections]
    O --> O7[Tire Reports]
    O --> O8[Tire Events]
    O --> O9[Equipment Axles]
    O --> O10[Tire Positions]

    style O fill:#e1f5fe
    style G fill:#e1f5fe
    style F fill:#e1f5fe
```

### Estructura de Directorios Actualizada

```
src/
├── app.module.ts                 # Módulo raíz con configuración global
├── main.ts                       # Bootstrap con Swagger y validaciones
├── prisma/
│   ├── prisma.module.ts          # Configuración global de Prisma
│   ├── prisma.service.ts         # Servicio de BD con logging
│   ├── schema.prisma             # Esquema completo (50+ modelos)
│   └── seed.ts                   # Seeds con datos argentinos
├── auth/                         # 🔐 Autenticación JWT completa
│   ├── auth.module.ts
│   ├── auth.service.ts           # Login, refresh tokens
│   ├── auth.controller.ts        # Endpoints /auth
│   ├── guards/ (JwtAuthGuard, RolesGuard)
│   ├── strategies/ (JwtStrategy)
│   └── dto/ (LoginDto, RefreshTokenDto)
├── users/                        # 👥 Gestión de usuarios del sistema
├── companies/                    # 🏢 Empresas y categorización
│   ├── companies/
│   ├── business-categories/
│   └── business-subcategories/
├── contacts/                     # 📞 Sistema polimórfico de contactos
├── employees/                    # 👷 RRHH completo
│   ├── employees/
│   ├── employee-categories/
│   ├── employee-positions/
│   └── employee-vacations/       # Con generación de PDFs
├── locations/                    # 📍 Sistema geográfico completo
│   ├── countries/                # Países con ISO codes
│   ├── provinces/                # Provincias argentinas
│   ├── cities/                   # Ciudades con códigos postales
│   └── addresses/                # Direcciones polimórficas
├── persons/                      # 👤 Personas físicas
│   ├── persons/
│   └── family/                   # Relaciones familiares
├── equipment/                    # 🔧 Gestión de flota vehicular
│   ├── controllers/              # CRUD equipos
│   ├── services/                 # Lógica de negocio
│   ├── dto/                      # Validaciones
│   ├── equipment-categories/
│   ├── equipment-types/
│   └── equipment-models/
├── catalogs/                     # 🏷️ Catálogos del sistema
│   ├── brands/                   # Marcas de equipos/neumáticos
│   └── units/                    # Unidades de medida
├── inspections/                  # 🔍 Sistema de inspecciones
├── documents/                    # 📄 Gestión documental con uploads
├── history/                      # 📊 Historial auditado
│   ├── controllers/
│   ├── services/
│   └── dto/
├── health/                       # 🏥 Health checks y monitoreo
├── tires/                        # 🛞 Gestión especializada de neumáticos
│   ├── tires/                    # CRUD neumáticos
│   ├── tire-models/              # Modelos comerciales
│   ├── tire-sizes/               # Medidas técnicas
│   ├── tire-assignments/         # Montaje/desmontaje
│   ├── tire-rotations/           # Rotaciones de posición
│   ├── tire-recaps/              # Recapados con costos
│   ├── tire-inspections/         # Control técnico
│   ├── tire-reports/             # Reportes analíticos
│   ├── tire-events/              # Timeline de eventos
│   ├── equipment-axles/          # Configuración de ejes
│   └── tire-positions/           # Posiciones en chasis
└── uploads/                      # 📁 Archivos organizados por entidad
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

### 🛞 Gestión de Neumáticos (`/tires`) - Módulo Especializado

El módulo de neumáticos implementa un **sistema completo y profesional** de gestión del ciclo de vida de neumáticos, desde el ingreso al stock hasta el descarte final. Diseñado específicamente para flotas vehiculares, incluye tracking completo de asignaciones, rotaciones, recapados e inspecciones técnicas con más de 10 submódulos especializados.

#### 🎯 Características Principales

- **Ciclo de Vida Completo**: Desde stock hasta descarte con tracking detallado y estados auditables
- **Gestión de Asignaciones**: Montaje/desmontaje en equipos con cálculo automático de km recorridos
- **Sistema de Rotaciones**: Cambios de posición y vehículo con historial completo y metadata
- **Recapado Profesional**: Control de reconstrucciones con proveedores, costos y número de recapados
- **Inspecciones Técnicas**: Seguimiento de presión, profundidad de banda, cortes y estado general
- **Reportes Analíticos Avanzados**: Vida útil promedio, costos por km, rankings de marcas, exportación Excel
- **Eventos Auditables**: Timeline completo con metadata JSON y accountability de usuarios
- **Configuración de Ejes**: Sistema flexible para diferentes tipos de chasis y configuraciones
- **Posiciones Dinámicas**: Enums especializados para posiciones en tractores, acoplados y duales

#### 📊 Arquitectura de Datos

```mermaid
erDiagram
    Tire ||--o{ TireAssignment : assigned
    Tire ||--o{ TireRotation : rotated
    Tire ||--o{ TireRecap : recapped
    Tire ||--o{ TireInspection : inspected
    Tire ||--o{ TireEvent : events

    TireAssignment }o--|| Equipment : mounted_on
    TireRotation }o--o{ Equipment : between

    TireSize ||--o{ Tire : sized
    TireSize ||--o{ TireSizeAlias : aliases

    Brand ||--o{ Tire : branded
```

##### Modelos Principales (50+ Modelos en Total)

| Elemento               | Descripción                                                    | Relaciones                      |
| ---------------------- | -------------------------------------------------------------- | ------------------------------- |
| **TireSize**           | Define la medida técnica base del neumático (normalizada)      | TireSizeAlias, TireModel        |
| **TireSizeAlias**      | Permite múltiples denominaciones (ej. "380/90R46" ≡ "14.9R46") | TireSize                        |
| **TireModel**          | Modelo comercial con marca, medida y especificaciones técnicas | Brand, TireSize, Tire           |
| **Tire**               | Neumático físico individual con serial único                   | TireModel, Assignments, etc.    |
| **TireAssignment**     | Historial de montaje/desmontaje con cálculo de km              | Tire, Equipment, PositionConfig |
| **TireRotation**       | Registra cambios de posición o vehículo                        | Tire                            |
| **TireRecap**          | Historial de recapados con proveedor y costo                   | Tire                            |
| **TireInspection**     | Control técnico: presión, profundidad, observaciones           | Tire                            |
| **TirePosition**       | Enum estandariza posiciones (DI, DD, E1I, E1D, etc.)           | -                               |
| **TireStatus**         | Enum controla estados (IN_STOCK, IN_USE, RECAP, DISCARDED)     | -                               |
| **TireEvent**          | Timeline de eventos con metadata JSON                          | Tire                            |
| **EquipmentAxle**      | Configuración de ejes por equipo                               | Equipment, TirePositionConfig   |
| **TirePositionConfig** | Configuración específica de posiciones por eje                 | EquipmentAxle, TireAssignment   |

##### Enums del Sistema

- **TireStatus**: IN_STOCK, IN_USE, UNDER_REPAIR, RECAP, DISCARDED
- **TirePosition**: DI, DD, E1I, E1D, E2I, E2D, etc. (delanteros, ejes traseros, duales)
- **TireEventType**: ASSIGNMENT, UNASSIGNMENT, ROTATION, INSPECTION, RECAP, DISCARD, OTHER

#### 🏗️ Submódulos y Funcionalidades

##### 1. **TiresModule** - Gestión Básica de Neumáticos

- **CRUD completo** de neumáticos con validaciones estrictas
- **Serial numbers únicos** con verificación automática
- **Relaciones complejas** con marcas, medidas y modelos
- **Estados dinámicos** con transiciones controladas
- **Búsqueda avanzada** por múltiples criterios
- **Integración con equipos** para asignaciones automáticas

##### 2. **TireAssignmentsModule** - Ciclo de Montaje Profesional

🧩 **Propósito**: Sistema completo para registrar dónde y cuándo se monta un neumático y cuándo se desmonta. Controla el estado actual, kilómetros recorridos y genera eventos auditables.

🧱 **Funcionalidades principales:**

- `POST /api/tires/assignments/mount` → montar neumático con validación de posición
- `PUT /api/tires/assignments/unmount/:id` → desmontar con cálculo automático de km
- `GET /api/tires/assignments/:tireId` → historial completo paginado
- `GET /api/tires/assignments/open` → asignaciones activas por equipo
- `GET /api/tires/assignments/equipment/:equipmentId` → neumáticos montados en equipo

💡 **Lógica de negocio avanzada:**

- **Validaciones estrictas**: Verificación de existencia de neumático y equipo
- **Cálculo automático**: `deltaKm = kmAtEnd - kmAtStart` con acumulación en `totalKm`
- **Estados consistentes**: Transición automática de estados del neumático
- **Eventos auditables**: Registro automático en `TireEvent` con metadata completa
- **Transacciones**: Operaciones críticas envueltas en transacciones de BD

##### 3. **TireRotationsModule** - Sistema de Rotaciones Avanzado

🧩 **Propósito**: Sistema completo para llevar registro de rotaciones internas (cambio de posición dentro del mismo vehículo o cambio entre vehículos) con tracking detallado.

🧱 **Funcionalidades completas:**

- `POST /api/tires/rotations` → registrar rotación con validaciones
- `GET /api/tires/rotations/:tireId` → historial paginado del neumático
- `GET /api/tires/rotations` → todas las rotaciones con filtros
- `PUT /api/tires/rotations/:id` → actualizar con control de versiones
- `DELETE /api/tires/rotations/:id` → eliminación con auditoría

💡 **Lógica de negocio especializada:**

- **Rotaciones intra-equipo**: Cambio de posición dentro del mismo vehículo
- **Rotaciones inter-equipo**: Cambio entre diferentes equipos
- **Validaciones**: Verificación de posiciones disponibles y estados consistentes
- **Cálculo de km**: Registro de `kmAtRotation` para análisis de desgaste
- **Eventos**: Generación automática de eventos en timeline
- **Historial**: Mantiene relación con asignaciones activas

##### 4. **TireRecapsModule** - Gestión Profesional de Recapados

🧩 **Propósito**: Sistema completo para gestionar recapados (reconstrucción de banda de rodamiento) con control de costos, proveedores y análisis de vida útil extendida.

🧱 **Funcionalidades especializadas:**

- `POST /api/tires/recaps` → registrar recapado con validaciones completas
- `GET /api/tires/recaps/:tireId` → historial completo con paginación
- `PUT /api/tires/recaps/:id` → actualizar con control de cambios
- `DELETE /api/tires/recaps/:id` → eliminación con auditoría

💡 **Campos especializados y lógica:**

- **Control de costos**: `cost` con decimales para precisión financiera
- **Proveedores**: `provider` para tracking de talleres especializados
- **Número de recapados**: `recapNumber` incremental automático
- **Fechas**: `recapDate` con validaciones de coherencia temporal
- **Observaciones**: Campo libre para notas técnicas

🧠 **Lógica de negocio avanzada:**

- **Incremento automático** de `recapCount` en el neumático
- **Transición de estados**: `IN_USE` → `RECAP` → `IN_USE` (post-proceso)
- **Validaciones**: Máximo de recapados por neumático (configurable)
- **Eventos auditables**: Registro en `TireEvent` con metadata completa
- **Reportes**: Integración con módulo de reportes para análisis de costos

##### 5. **TireInspectionsModule** - Control Técnico Profesional

🧩 **Propósito**: Sistema completo de control periódico del estado físico y técnico de neumáticos con métricas especializadas para mantenimiento predictivo.

🧱 **Funcionalidades técnicas:**

- `POST /api/tires/inspections` → nueva inspección con validaciones
- `GET /api/tires/inspections/:tireId` → historial completo paginado
- `GET /api/tires/inspections/:id` → inspección específica con detalles
- `PUT /api/tires/inspections/:id` → actualizar con control de versiones
- `DELETE /api/tires/inspections/:id` → eliminación con auditoría

💡 **Campos técnicos especializados:**

- **Presión**: `pressure` (PSI/Bar) con rangos recomendados por medida
- **Profundidad**: `treadDepth` (mm) con alertas automáticas
- **Observaciones**: Campo libre para cortes, desgaste irregular, daños
- **Fecha**: `inspectionDate` con validaciones de periodicidad
- **Inspector**: Relación con `Employee` para accountability

🧠 **Lógica de mantenimiento predictivo:**

- **Alertas automáticas**: Profundidad < 4mm dispara warnings
- **Tendencias**: Análisis de desgaste por posición y marca
- **Reportes**: Integración con reportes para análisis de flota
- **Historial**: Timeline completo para predicción de vida útil

##### 6. **TireReportsModule** - Analítica y Reportes Empresariales

Sistema completo de business intelligence para neumáticos con métricas clave de rendimiento, costos y optimización de flota.

**Reportes Estratégicos Disponibles:**

- `GET /api/tires/reports/average-life` → promedio de vida útil por marca/modelo
- `GET /api/tires/reports/cost-per-km` → costo total por km con breakdown
- `GET /api/tires/reports/over-recap?threshold=2` → neumáticos con excesivos recapados
- `GET /api/tires/reports/brand-ranking` → ranking de marcas por duración y costo
- `GET /api/tires/reports/yearly-recaps?year=2024` → análisis anual de recapados
- `GET /api/tires/reports/usage-analysis` → análisis de uso por equipo/posición
- `GET /api/tires/reports/fleet-efficiency` → eficiencia general de la flota

**Exportaciones Profesionales Excel:**

- **Formato empresarial**: Headers, filtros, formato condicional
- **Múltiples worksheets**: Datos resumidos + detalle completo
- **Gráficos integrados**: Para presentaciones ejecutivas
- **Filtros avanzados**: Por fecha, marca, equipo, etc.

#### 🌐 Endpoints Principales del Sistema de Neumáticos

##### CRUD Básico de Neumáticos (`/tires`)

- `POST /tires` - Crear neumático con validaciones completas
- `GET /tires` - Listar con filtros avanzados (marca, estado, equipo)
- `GET /tires/:id` - Detalle completo con relaciones
- `PUT /tires/:id` - Actualizar con control de cambios
- `DELETE /tires/:id` - Eliminar con verificación de dependencias

##### Tamaños y Medidas (`/tires/sizes`)

- `POST /tires/sizes` - Crear medida técnica normalizada
- `GET /tires/sizes` - Listar con aliases y paginación
- `GET /tires/sizes/:id` - Detalle con todas las denominaciones
- `PUT /tires/sizes/:id` - Actualizar con validaciones
- `DELETE /tires/sizes/:id` - Eliminar (solo si no usada)
- `GET /tires/sizes/:sizeId/aliases` - Ver aliases alternativos

##### Modelos Comerciales (`/tires/models`)

- `POST /tires/models` - Crear modelo con marca y especificaciones
- `GET /tires/models` - Listar con filtros por marca/tamaño
- `GET /tires/models/:id` - Especificaciones técnicas completas
- `PUT /tires/models/:id` - Actualizar datos comerciales
- `DELETE /tires/models/:id` - Eliminar con verificación de uso

#### 📋 Ejemplos de Uso

##### Montar Neumático

```bash
POST /api/tires/assignments/mount
Content-Type: application/json
Authorization: Bearer <token>

{
  "tireId": 12,
  "equipmentId": 3,
  "position": "E2I",
  "kmAtStart": 120000,
  "note": "Montaje inicial campaña"
}
```

##### Desmontar Neumático

```bash
PUT /api/tires/assignments/unmount
Content-Type: application/json
Authorization: Bearer <token>

{
  "assignmentId": 45,
  "kmAtEnd": 121250,
  "note": "Rotación"
}
```

##### Registrar Recapado

```bash
POST /api/tires/recaps
Content-Type: application/json
Authorization: Bearer <token>

{
  "tireId": 12,
  "provider": "Vulcanizadora RCM",
  "cost": 85000.50,
  "notes": "Recap inicial después de 60.000 km"
}
```

##### Nueva Inspección

```bash
POST /api/tires/inspections
Content-Type: application/json
Authorization: Bearer <token>

{
  "tireId": 12,
  "pressure": 32.5,
  "treadDepth": 8.5,
  "observation": "Buen estado general"
}
```

##### Registrar Rotación

```bash
POST /api/tires/rotations
Content-Type: application/json
Authorization: Bearer <token>

{
  "tireId": 12,
  "fromEquipmentId": 3,
  "toEquipmentId": 5,
  "fromPosition": "E2I",
  "toPosition": "E1D",
  "kmAtRotation": 121250,
  "notes": "Rotación preventiva"
}
```

#### 🔄 Flujos de Trabajo Empresariales

##### Flujo Completo de Recapado

1. **Registro inicial**: Se crea `TireRecap` con proveedor y costo
2. **Validaciones**: Verificación de estado actual del neumático
3. **Cálculo automático**: `recapNumber` incremental por neumático
4. **Transición de estado**: `IN_USE` → `RECAP` (bloquea operaciones)
5. **Evento auditado**: Registro en `TireEvent` con metadata completa
6. **Post-proceso**: Retorno a `IN_USE` vía montaje posterior
7. **Reportes**: Actualización automática de métricas de costo

##### Ciclo de Vida Completo del Neumático

```mermaid
stateDiagram-v2
    [*] --> IN_STOCK: Ingreso a stock
    IN_STOCK --> IN_USE: Montaje en equipo
    IN_USE --> UNDER_REPAIR: Mantenimiento
    UNDER_REPAIR --> IN_USE: Reparación completa
    IN_USE --> RECAP: Recapado programado
    RECAP --> IN_USE: Post-recapado
    IN_USE --> DISCARDED: Fin de vida útil
    DISCARDED --> [*]
    IN_USE --> IN_STOCK: Desmontaje temporal
```

##### Gestión Avanzada de Kilómetros

- **Montaje**: `kmAtStart` con validación de coherencia
- **Desmontaje**: `kmAtEnd` con cálculo `deltaKm = kmAtEnd - kmAtStart`
- **Acumulación**: Suma automática a `totalKm` del neumático
- **Rotaciones**: `kmAtRotation` para análisis de desgaste por posición
- **Validaciones**: Control de km crecientes y alertas de anomalías

#### 📊 Reportes y Analítica Empresarial

##### Vida Útil Promedio por Categorías

```json
{
  "totalTires": 150,
  "averageLifeKm": 45230,
  "byBrand": [
    { "brand": "Michelin", "count": 45, "avgKm": 52140 },
    { "brand": "Bridgestone", "count": 38, "avgKm": 48920 },
    { "brand": "Firestone", "count": 67, "avgKm": 39800 }
  ],
  "byPosition": [
    { "position": "E1I", "avgKm": 48500 },
    { "position": "E2D", "avgKm": 42100 }
  ]
}
```

##### Análisis de Costos Detallado

```json
[
  {
    "tireId": 12,
    "serialNumber": "MIC2024001",
    "brand": "Michelin",
    "totalCost": 125000.5,
    "totalKm": 60000,
    "costPerKm": 2.08,
    "recapCount": 1,
    "recapCost": 45000.0,
    "efficiency": "Excelente (>50k km)"
  }
]
```

##### Ranking Ejecutivo de Marcas

```json
{
  "ranking": [
    {
      "brand": "Michelin",
      "avgKm": 52140,
      "totalCost": 2850000,
      "costPerKm": 1.95,
      "reliability": 95.2,
      "marketShare": 30
    },
    {
      "brand": "Bridgestone",
      "avgKm": 48920,
      "totalCost": 2450000,
      "costPerKm": 2.15,
      "reliability": 92.8,
      "marketShare": 25
    }
  ],
  "recommendations": [
    "Michelin ofrece mejor relación costo/vida útil",
    "Considerar aumento de cuota Bridgestone para negociación de precios"
  ]
}
```

#### 🔧 Consideraciones Técnicas Avanzadas

##### Transacciones y Consistencia

- **Transacciones Prisma**: Todas las operaciones críticas usan `$transaction` para atomicidad completa
- **Rollback automático**: En caso de error, se revierten todos los cambios relacionados
- **Eventos dentro de transacción**: Los registros de auditoría se crean dentro de la misma transacción
- **Locks optimistas**: Control de concurrencia para operaciones simultáneas

##### Sistema de Eventos y Auditoría Completo

- **TireEvent timeline**: Historial completo de cada neumático con metadata JSON estructurada
- **Eventos tipados**: ASSIGNMENT, UNASSIGNMENT, ROTATION, INSPECTION, RECAP, DISCARD, OTHER
- **Accountability**: Relación con usuarios del sistema para trazabilidad completa
- **Metadata rica**: JSON con detalles específicos de cada operación (proveedor, costo, km, etc.)

##### Validaciones Empresariales

- **Serial numbers únicos**: Validación global con índices de BD optimizados
- **Integridad referencial**: Verificación de existencia de equipos, neumáticos y posiciones
- **Estados consistentes**: Máquina de estados con transiciones validadas
- **Reglas de negocio**: Límite de recapados, profundidades mínimas, costos razonables

##### Optimizaciones de Performance

- **Índices estratégicos**: En campos de búsqueda frecuente (serialNumber, status, brandId)
- **Includes selectivos**: Carga lazy de relaciones para optimizar queries
- **Paginación universal**: Implementada en todos los listados con cursores
- **Caching**: Preparado para Redis en operaciones frecuentes
- **Queries optimizadas**: Uso de raw SQL para reportes complejos cuando es necesario

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

### Arquitectura de Datos Empresarial

El sistema utiliza **MySQL 8.0+** con **Prisma ORM 6.17+** para una gestión robusta de datos relacionales complejos con más de **50 modelos** y **relaciones polimórficas avanzadas**.

#### Diagrama de Relaciones Completo

```mermaid
erDiagram
    User ||--o{ Company : manages
    Company ||--o{ Employee : employs
    Company ||--o{ Equipment : owns
    Company ||--o{ Contact : has
    Company ||--o{ Address : located
    Company ||--o{ Document : stores
    Company ||--o{ Product : sells
    Company ||--o{ Part : supplies

    Person ||--o{ Employee : is
    Person ||--o{ Contact : has
    Person ||--o{ Address : lives
    Person ||--|| Family : related

    Employee ||--o{ EmployeeVacation : takes
    Employee ||--o{ Document : owns
    Employee ||--o{ Inspection : performs
    Employee ||--o{ EmployeeIncident : has

    Equipment ||--o{ Inspection : undergoes
    Equipment ||--o{ EquipmentMaintenance : receives
    Equipment ||--o{ Document : has
    Equipment ||--o{ TireAssignment : has_tires
    Equipment ||--o{ EquipmentAxle : configured

    Country ||--|{ Province : contains
    Province ||--|{ City : contains
    City ||--|{ Address : has

    BusinessCategory ||--|{ BusinessSubCategory : categorizes
    EquipmentCategory ||--|{ EquipmentType : groups
    EquipmentType ||--|{ EquipmentModel : defines

    Brand ||--o{ Tire : brands
    Brand ||--o{ EquipmentModel : brands
    Brand ||--o{ Product : brands
    Brand ||--o{ Part : brands

    TireSize ||--o{ Tire : sizes
    TireSize ||--o{ TireSizeAlias : aliases
    Tire ||--o{ TireAssignment : assigned
    Tire ||--o{ TireRotation : rotated
    Tire ||--o{ TireRecap : recapped
    Tire ||--o{ TireInspection : inspected
    Tire ||--o{ TireEvent : events

    TireAssignment }o--|| TirePositionConfig : positioned
    EquipmentAxle ||--o{ TirePositionConfig : has_positions
```

#### Enums del Sistema (25+ Enums Empresariales)

##### Gestión de Usuarios y Roles

- **Role**: USER (básico), ADMIN (control total), MANAGER (gestión intermedia)

##### Recursos Humanos

- **EmployeeStatus**: ACTIVE, SUSPENDED, TERMINATED
- **Gender**: MALE, FEMALE, OTHER
- **MaritalStatus**: SINGLE, MARRIED, DIVORCED, WIDOWED
- **PersonStatus**: ACTIVE, INACTIVE
- **VacationType**: ASSIGNED (crédito), TAKEN (efectivamente usado)

##### Contactos y Comunicaciones

- **ContactType**: EMAIL, PHONE, WHATSAPP, TELEGRAM, INSTAGRAM, LINKEDIN, OTHER

##### Equipos y Flota

- **EquipmentStatus**: ACTIVE, INACTIVE, MAINTENANCE, RETIRED
- **MaintenanceType**: PREVENTIVE, CORRECTIVE, ACCIDENT_REPAIR, ROUTINE_CHECK
- **AxleType**: FRONT, DRIVE, TRAILER, TAG

##### Sistema de Neumáticos Especializado

- **TireStatus**: IN_STOCK, IN_USE, UNDER_REPAIR, RECAP, DISCARDED
- **TirePosition**: DI, DD, E1I, E1D, E2I, E2D, E3I, E3D, E1II, E1ID, etc.
- **TireEventType**: ASSIGNMENT, UNASSIGNMENT, ROTATION, INSPECTION, RECAP, DISCARD, OTHER
- **TireSide**: LEFT, RIGHT, INNER, OUTER

##### Historial y Auditoría

- **HistoryType**: EMPLOYEE_ILLNESS, EMPLOYEE_WARNING, VACATION_ASSIGNED, EQUIPMENT_MAINTENANCE, etc.
- **SeverityLevel**: INFO, WARNING, CRITICAL, SUCCESS
- **EmployeeIncidentType**: SICK_LEAVE, DISCIPLINARY, WARNING, ACCIDENT, FAMILY_EMERGENCY

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

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

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
