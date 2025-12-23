# SAE Backend - Sistema de Administración Empresarial

## 📋 Descripción

SAE Backend es una **API REST empresarial completa y profesional** desarrollada con **NestJS 10.x** y **Prisma ORM 6.17+** para la gestión integral de un sistema de administración empresarial. El proyecto implementa una arquitectura modular avanzada que abarca desde la gestión de recursos humanos hasta el control especializado de flota vehicular y neumáticos, con énfasis en la **trazabilidad completa**, **auditoría exhaustiva** y **operaciones transaccionales seguras**.

### 🎯 Características Principales

- **🏗️ Arquitectura Modular Empresarial**: 40+ módulos independientes organizados por dominio de negocio
- **🔐 Autenticación JWT Robusta**: Sistema de login con refresh tokens, roles jerárquicos (USER, ADMIN, MANAGER) y guards avanzados
- **🗄️ Base de Datos Compleja**: MySQL 8.0+ con 50+ modelos relacionados, migraciones automatizadas e índices estratégicos
- **📚 Documentación Interactiva**: Swagger/OpenAPI 7.4+ completa con UI interactiva en `/api/docs`
- **📄 Gestión Documental Avanzada**: Subida/descarga de archivos con organización automática por entidad y límites configurables
- **📊 Historial Auditado Completo**: Sistema de logs polimórfico para eventos, incidentes, mantenimiento y operaciones críticas
- **🔗 Polimorfismo Avanzado**: Contactos y direcciones compartidas entre múltiples entidades con relaciones N:M
- **🧪 Testing Exhaustivo**: Cobertura completa con Jest para unitarios, integración y e2e (>80% objetivo)
- **🛞 Gestión de Neumáticos Especializada**: Módulo profesional para ciclo de vida completo con asignaciones, rotaciones, recapados e inspecciones
- **🔍 Sistema de Inspecciones Técnico**: Control periódico de equipos y neumáticos con métricas especializadas
- **📈 Reportes Analíticos Empresariales**: Generación de reportes Excel, PDF, CSV, DOCX, métricas de rendimiento y business intelligence
- **⚡ Performance Optimizada**: Consultas optimizadas, caching preparado y transacciones ACID
- **🐳 Despliegue Profesional**: Docker multi-stage, health checks y configuración de producción
- **🗑️ Soft Delete Implementado**: Eliminación lógica en todas las entidades principales con campos `isActive` y `deletedAt`

### 📊 Estadísticas del Proyecto

- **Versión**: 1.1.0
- **Autor**: Renzo O. Gorosito
- **Licencia**: MIT
- **Última Actualización**: Diciembre 2024
- **Lenguaje**: TypeScript 5.1+ (strict mode)
- **Framework**: NestJS 10.x con arquitectura modular
- **Base de Datos**: MySQL 8.0+ con 50+ modelos
- **Cobertura Testing**: >80% (objetivo)
- **Documentación**: 100% endpoints documentados
- **Módulos**: 40+ módulos especializados
- **Controladores**: 35+ controladores REST
- **Servicios**: 35+ servicios de negocio
- **DTOs**: 50+ objetos de transferencia validados

## 🚀 Tecnologías y Arquitectura

### 🏗️ Core Framework Empresarial

- **Framework Principal**: NestJS 10.x con arquitectura modular hexagonal
- **Lenguaje**: TypeScript 5.1+ con configuración estricta (strict mode + noImplicitAny)
- **Runtime**: Node.js 18+ LTS con ES2022 features
- **Gestión de Dependencias**: npm 8+ con package-lock.json para reproducibilidad
- **Compilación**: SWC compiler para builds ultra-rápidos
- **Arquitectura**: Patrón modular con inyección de dependencias avanzada

### 🗄️ Base de Datos y ORM

- **Motor de BD**: MySQL 8.0+ con InnoDB engine
- **ORM**: Prisma 6.19.0 con cliente TypeScript generado automáticamente
- **Migraciones**: Sistema automatizado con rollback y preview
- **Relaciones**: Soporte completo para 1:1, 1:N, N:M, polimórficas y self-referencing
- **Índices**: Optimización estratégica en campos de búsqueda (composite indexes)
- **Transacciones**: ACID transactions con Prisma.$transaction()
- **Connection Pooling**: Configurado para alta concurrencia
- **Raw Queries**: SQL nativo para reportes complejos cuando es necesario

### 🔐 Autenticación y Seguridad Empresarial

- **Protocolo**: JWT (JSON Web Tokens) con algoritmo HS256
- **Tokens**: Access (1 día) + Refresh (7 días) con rotación automática
- **Autorización**: Guards jerárquicos (USER < MANAGER < ADMIN)
- **Rate Limiting**: @nestjs/throttler (10 req/min, configurable por endpoint)
- **Validación**: class-validator + class-transformer con transformación automática
- **Hashing**: bcrypt con 12 salt rounds para máxima seguridad
- **CORS**: Configurado por entorno (desarrollo vs producción)
- **Helmet**: Headers de seguridad HTTP automáticos
- **Input Sanitization**: Validación estricta de todos los inputs

### 📚 Documentación y Testing

- **Documentación API**: Swagger/OpenAPI 7.4+ con UI interactiva completa
- **Esquemas**: Auto-generados desde DTOs con decoradores @ApiProperty
- **Testing Framework**: Jest 29+ con configuración dedicada
- **Cobertura**: Reportes detallados (>80% objetivo: statements, branches, functions, lines)
- **E2E Testing**: Tests end-to-end con base de datos de prueba aislada
- **Integration Tests**: Módulos y dependencias entre servicios
- **Mocking**: Servicios externos y base de datos para tests unitarios

### 🛠️ Utilidades y Librerías Especializadas

- **File Upload**: Multer con storage en disco, límites configurables (10MB) y validación MIME
- **PDF Generation**: pdf-lib y pdfkit para documentos dinámicos (notificaciones de vacaciones, reportes)
- **DOCX Generation**: docx para documentos Word dinámicos y reportes profesionales
- **Date Handling**: date-fns para manipulación robusta y timezone-aware
- **Excel Export**: exceljs para reportes empresariales con formato profesional
- **CSV Processing**: csv-parse para importación masiva, json2csv para exportación avanzada
- **Compression**: Gzip automático en respuestas HTTP
- **Logging**: Winston/NestJS logger con niveles configurables y structured logging
- **Caching**: Preparado para Redis con @nestjs/cache-manager
- **Email**: Preparado para servicios SMTP con nodemailer
- **Queue Jobs**: Preparado para Bull con Redis para tareas asíncronas

## ⚙️ Configuración rápida

### 1. Requisitos del Sistema

- **Node.js**: 20+ (LTS recomendado)
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

### 🏛️ Arquitectura de Módulos Empresariales

```mermaid
graph TB
    %% Core Application
    A[🏢 App Module<br/>Root Container] --> B[🔐 Auth Module<br/>JWT + Guards]
    A --> C[👥 Users Module<br/>User Management]
    A --> P[🗄️ Prisma Module<br/>Database Layer]

    %% Business Domain Modules
    A --> D[🏢 Companies Module<br/>Business Entities]
    A --> E[📞 Contacts Module<br/>Polymorphic Links]
    A --> F[👷 Employees Module<br/>HR Management]
    A --> G[🔧 Equipment Module<br/>Fleet Management]
    A --> H[📍 Locations Module<br/>Geographic Data]
    A --> I[👤 Persons Module<br/>Physical Persons]
    A --> J[📄 Server Files Module<br/>File Management]
    A --> K[📊 History Module<br/>Audit Logs]
    A --> L[🔍 Inspections Module<br/>Technical Control]
    A --> M[🏥 Health Module<br/>System Health]
    A --> N[🏷️ Catalogs Module<br/>System Catalogs]
    A --> O[✅ Validators Module<br/>Custom Validators]
    A --> P[🛞 Tires Module<br/>Tire Lifecycle<br/>⭐ SPECIALIZED]

    %% Submodules with detailed breakdown
    D --> D1[📂 Business Categories<br/>Industry Classification]
    D --> D2[📂 Business Subcategories<br/>Specialization]

    F --> F1[📂 Employee Categories<br/>Job Levels]
    F --> F2[📂 Employee Positions<br/>Job Titles]
    F --> F3[📂 Employee Vacations<br/>Leave Management<br/>📄 PDF Generation]

    G --> G1[📂 Equipment Categories<br/>Vehicle Types]
    G --> G2[📂 Equipment Types<br/>Models]
    G --> G3[📂 Equipment Models<br/>Specifications]

    H --> H1[🌍 Countries<br/>ISO Codes]
    H --> H2[🏛️ Provinces<br/>States/Regions]
    H --> H3[🏙️ Cities<br/>Postal Codes]
    H --> H4[🏠 Addresses<br/>Polymorphic]

    I --> I1[👨‍👩‍👧 Family Relationships<br/>Kinship]

    K --> K1[🚨 Employee Incidents<br/>HR Events]
    K --> K2[🔧 Equipment Maintenance<br/>Service Records]
    K --> K3[📋 History Logs<br/>Polymorphic Audit]

    N --> N1[🏷️ Brands<br/>Manufacturers]
    N --> N2[📏 Units<br/>Measurements]

    %% Tires Module - Highly Specialized
    P --> P1[📏 Tire Sizes<br/>Technical Measures]
    P --> P2[🏷️ Tire Models<br/>Commercial Models]
    P --> P3[🔗 Tire Assignments<br/>Mount/Unmount<br/>📊 Km Tracking]
    P --> P4[🔄 Tire Rotations<br/>Position Changes<br/>📍 Equipment Transfer]
    P --> P5[🔧 Tire Recaps<br/>Retreading<br/>💰 Cost Tracking]
    P --> P6[🔍 Tire Inspections<br/>Technical Control<br/>📊 Metrics]
    P --> P7[📊 Tire Reports<br/>Analytics<br/>📈 Excel Export]
    P --> P8[🕐 Tire Events<br/>Timeline<br/>🔍 Audit Trail]
    P --> P9[🛠️ Equipment Axles<br/>Chassis Config]
    P --> P10[📍 Tire Positions<br/>Mounting Points]

    %% Styling for emphasis
    style O fill:#e1f5fe,stroke:#01579b,stroke-width:3px
    style G fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style F fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    style A fill:#fff3e0,stroke:#e65100,stroke-width:2px

    %% Legend
    LEG[📖 Legend<br/>🟦 Core Modules<br/>🟪 Business Domains<br/>🟨 Specialized Features]
```

### 📁 Estructura de Directorios Empresarial

```
src/
├── 📁 app.module.ts                    # 🏢 Módulo raíz con configuración global
├── 📁 main.ts                          # 🚀 Bootstrap con Swagger y validaciones
├── 📁 common/                          # 🛠️ Utilidades compartidas
│   ├── exceptions/                     # 🚨 Filtros de excepciones HTTP
│   ├── guards/                         # 🛡️ Guards personalizados
│   ├── interceptors/                   # 🔄 Interceptors de respuesta
│   └── validators/                     # ✅ Validadores personalizados
├── 📁 prisma/                          # 🗄️ Capa de base de datos
│   ├── prisma.module.ts                # ⚙️ Configuración global de Prisma
│   ├── prisma.service.ts               # 🔌 Servicio de BD con logging
│   ├── schema.prisma                   # 📋 Esquema completo (50+ modelos)
│   ├── seed.ts                         # 🌱 Seeds con datos argentinos
│   └── exports.ts                      # 📤 Exportaciones de tipos
├── 📁 auth/                            # 🔐 Autenticación JWT completa
│   ├── auth.module.ts                  # 📦 Módulo de autenticación
│   ├── auth.service.ts                 # 🔑 Login, refresh tokens, hashing
│   ├── auth.controller.ts              # 🌐 Endpoints /auth
│   ├── guards/                         # 🛡️ JwtAuthGuard, RolesGuard
│   ├── strategies/                     # 🎯 JwtStrategy
│   └── dto/                            # 📝 LoginDto, RefreshTokenDto
├── 📁 users/                           # 👥 Gestión de usuarios del sistema
│   ├── users.controller.ts             # 🌐 CRUD usuarios
│   ├── users.service.ts                # 🔧 Lógica de negocio
│   ├── users.module.ts                 # 📦 Módulo users
│   ├── dto/                            # 📝 CreateUserDto, UpdateUserDto
│   └── users.spec.ts                   # 🧪 Tests unitarios
├── 📁 companies/                       # 🏢 Empresas y categorización
│   ├── companies.controller.ts         # 🌐 CRUD empresas
│   ├── companies.service.ts            # 🏭 Lógica empresarial
│   ├── companies.module.ts             # 📦 Módulo companies
│   ├── dto/                            # 📝 CreateCompanyDto
│   ├── business-categories/            # 📂 Categorías de negocio
│   └── business-subcategories/         # 📂 Subcategorías
├── 📁 contacts/                        # 📞 Sistema polimórfico de contactos
│   ├── contacts.controller.ts          # 🌐 Gestión de contactos
│   ├── contacts.service.ts             # 📱 Lógica de contactos
│   └── dto/                            # 📝 ContactDtos
├── 📁 employees/                       # 👷 RRHH completo
│   ├── employees.controller.ts         # 🌐 CRUD empleados
│   ├── employees.service.ts            # 👔 Lógica de RRHH
│   ├── employees.module.ts             # 📦 Módulo employees
│   ├── dto/                            # 📝 EmployeeDtos
│   ├── employee-categories/            # 📂 Categorías laborales
│   ├── employee-positions/             # 📂 Puestos de trabajo
│   └── employee-vacations/             # 📂 Vacaciones con PDF
├── 📁 locations/                       # 📍 Sistema geográfico completo
│   ├── locations.module.ts             # 📦 Módulo locations
│   ├── countries/                      # 🌍 Países con ISO codes
│   ├── provinces/                      # 🏛️ Provincias argentinas
│   ├── cities/                         # 🏙️ Ciudades con códigos postales
│   └── addresses/                      # 🏠 Direcciones polimórficas
├── 📁 persons/                         # 👤 Personas físicas
│   ├── persons.controller.ts           # 🌐 CRUD personas
│   ├── persons.service.ts              # 👤 Lógica de personas
│   ├── persons.module.ts               # 📦 Módulo persons
│   ├── dto/                            # 📝 PersonDtos
│   └── family/                         # 👨‍👩‍👧 Relaciones familiares
├── 📁 equipment/                       # 🔧 Gestión de flota vehicular
│   ├── equipment.module.ts             # 📦 Módulo equipment
│   ├── controllers/                    # 🌐 CRUD equipos
│   ├── services/                       # 🔧 Lógica de flota
│   ├── dto/                            # 📝 EquipmentDtos
│   ├── equipment-categories/           # 📂 Categorías de equipos
│   ├── equipment-types/                # 📂 Tipos de equipos
│   ├── equipment-models/               # 📂 Modelos de equipos
│   └── equipment-axles/                # 📂 Configuración de ejes
├── 📁 catalogs/                        # 🏷️ Catálogos del sistema
│   ├── catalogs.module.ts              # 📦 Módulo catalogs
│   ├── brands/                         # 🏷️ Marcas de equipos/neumáticos
│   └── units/                          # 📏 Unidades de medida
├── 📁 inspections/                     # 🔍 Sistema de inspecciones
│   ├── inspections.controller.ts       # 🌐 Control técnico
│   ├── inspections.service.ts          # 🔍 Lógica de inspecciones
│   └── inspections.module.ts           # 📦 Módulo inspections
├── 📁 server-files/                    # 📄 Gestión documental avanzada con estrategia
│   ├── server-files.controller.ts      # 🌐 Upload/download archivos
│   ├── server-files.service.ts         # 📄 Lógica con factory pattern
│   ├── factory/                        # 🏭 Storage factory
│   ├── strategies/                     # 🎯 Estrategias por entidad
│   ├── dto/                            # 📝 File upload DTOs
│   └── server-files.module.ts          # 📦 Módulo server-files
├── 📁 history/                         # 📊 Historial auditado
│   ├── history.module.ts               # 📦 Módulo history
│   ├── controllers/                    # 🌐 Logs polimórficos
│   ├── services/                       # 📊 Lógica de auditoría
│   └── dto/                            # 📝 HistoryDtos
├── 📁 reports/                         # 📊 Sistema unificado de reportes
│   ├── reports.module.ts               # 📦 Módulo principal
│   ├── controllers/                    # 🌐 Controladores HTTP
│   │   └── reports.controller.ts       # 📊 Endpoints generate/preview
│   ├── services/                       # 🔧 Servicios de negocio
│   │   └── reports.service.ts          # 📈 Lógica de reportes
│   ├── factories/                      # 🏭 Factory pattern
│   │   ├── report-factory.ts           # 🎯 Factory de estrategias
│   │   └── report-format-factory.ts    # 📄 Factory de formatos
│   ├── formatters/                     # 🖨️ Generadores de formatos
│   │   ├── excel.formatter.ts          # 📊 Excel profesional
│   │   ├── pdf.formatter.ts            # 📄 PDF dinámico
│   │   ├── csv.formatter.ts            # 📋 CSV export
│   │   └── docx.formatter.ts           # 📝 Word documents
│   ├── mappers/                        # 🔄 Transformadores de datos
│   │   ├── report-data.mapper.ts       # 📊 Mapper base
│   │   ├── employee/                   # 👷 Mappers de empleados
│   │   ├── equipment/                  # 🔧 Mappers de equipos
│   │   └── tire/                       # 🛞 Mappers de neumáticos
│   ├── strategies/                     # 🎯 Estrategias por entidad
│   │   ├── report-strategy.interface.ts # 🎯 Interfaz base
│   │   ├── employee/                   # 👷 Estrategias RRHH
│   │   ├── equipment/                  # 🔧 Estrategias flota
│   │   └── tire/                       #  Estrategias neumáticos
│   ├── core/                           # ⚙️ Componentes core
│   │   ├── report-type.enum.ts         # 📋 Tipos de reportes
│   │   ├── report-format.enum.ts       # 📄 Formatos disponibles
│   │   ├── report-context.ts           # 📊 Contexto de ejecución
│   │   ├── report-metadata.ts          # 📋 Metadata del reporte
│   │   └── report-result.ts            # 📤 Resultado final
│   └── dto/                            # 📝 DTOs de reportes
│       └── generate-report.dto.ts      # 📋 Request DTO
├── 📁 tires/                           # 🛞 Gestión especializada de neumáticos ⭐
│   ├── tires.module.ts                 # 📦 Módulo principal
│   ├── tires.controller.ts             # 🌐 CRUD neumáticos
│   ├── tires.service.ts                # 🛞 Lógica de neumáticos
│   ├── dto/                            # 📝 TireDtos
│   ├── tire-models/                    # 🏷️ Modelos comerciales
│   ├── tire-sizes/                     # 📏 Medidas técnicas
│   ├── tire-assignments/               # 🔗 Montaje/desmontaje con km
│   ├── tire-rotations/                 # 🔄 Rotaciones de posición
│   ├── tire-recaps/                    # 🔧 Recapados con costos
│   ├── tire-inspections/               # 🔍 Control técnico
│   ├── tire-reports/                   # 📊 Reportes Excel
│   ├── tire-events/                    # 🕐 Timeline auditado
│   └── tire-positions/                 # 📍 Posiciones en chasis
├── 📁 modules/validators/              # ✅ Validadores personalizados
│   ├── validators.module.ts            # 📦 Módulo de validadores
│   ├── validators.controller.ts        # 🌐 Endpoints de validación
│   ├── validators.service.ts           # ✅ Lógica de validación
│   ├── validators.config.ts            # ⚙️ Configuración
│   └── dto/                            # 📝 DTOs de validación
└── 📁 storage/                         #  Archivos organizados por entidad
    ├── uploads/                        # 📁 Archivos subidos
    │   ├── employees/                  # 👷 Documentos de empleados
    │   └── companies/                  # 🏢 Documentos de empresas
    └── reports/                        # 📊 Reportes generados
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
- **Km al recapado**: `kmAtRecap` para tracking de kilómetros acumulados
- **Tipo de recapado**: `recapType` (full, partial, delamination_repair)
- **Usuario creador**: `createdBy` para accountability

🧠 **Lógica de negocio avanzada:**

- **Incremento automático** de `recapCount` en el neumático (denormalización)
- **Actualización de denormalización**: `lastRecapAt` y `lastRecapId` en neumático
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
  "notes": "Recap inicial después de 60.000 km",
  "kmAtRecap": 60000,
  "recapType": "full"
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
4. **Transición de estado**: `IN_USE` → `RECAP` → `IN_USE` (post-proceso)
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

### 📄 Server Files (`/server-files`)

- `POST /server-files/upload` - Subir archivo con estrategia por entidad
- `GET /server-files` - Listar archivos (con filtros)
- `GET /server-files/:id` - Obtener metadatos del archivo
- `GET /server-files/:id/download` - Descargar archivo
- `PUT /server-files/:id` - Actualizar metadatos
- `DELETE /server-files/:id` - Eliminar archivo y registro

**Entidades soportadas:** EMPLOYEE, COMPANY

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

### ✅ Validadores (`/validators`)

- `POST /validators/unique` - Validar unicidad de campos
- `GET /validators/config` - Obtener configuración de validadores

### 📊 Reportes (`/reports`)

El módulo de reportes implementa un **sistema unificado y extensible** para la generación de reportes empresariales en múltiples formatos. Utiliza una arquitectura de Factory Pattern para soporte dinámico de diferentes tipos de reportes y formatos de salida.

#### Características Principales

- **Múltiples Formatos**: Excel, PDF, CSV, DOCX con formateo profesional
- **Vista Previa**: Endpoint dedicado para previsualizar datos antes de generar
- **Factory Pattern**: Arquitectura extensible para nuevos tipos de reportes
- **Mappers Especializados**: Transformación de datos organizada por entidad
- **Formatters Modulares**: Cada formato implementado como componente independiente

#### Endpoints Principales

- `POST /reports/generate` - Generar reporte en formato especificado
- `POST /reports/preview` - Previsualizar datos del reporte

#### Tipos de Reportes Disponibles

- `EMPLOYEE_LIST` - Lista completa de empleados
- `EMPLOYEE_VACATION_BALANCE` - Reporte de balance de vacaciones de empleados
- `EQUIPMENT_LIST` - Inventario de equipos
- `TIRE_LIST` - Gestión de neumáticos

#### Ejemplo de Uso

```bash
POST /api/reports/generate
Content-Type: application/json
Authorization: Bearer <token>

{
  "reportType": "EMPLOYEE_LIST",
  "format": "EXCEL",
  "filter": {
    "categoryId": 1,
    "status": "ACTIVE"
  },
  "title": "Lista de Empleados - Recursos Humanos"
}
```

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

## 📄 Sistema de Gestión Documental Avanzada

### Características Principales

- **Arquitectura por Estrategias**: Patrón Strategy para diferentes tipos de entidades
- **Subida de archivos**: Soporte para múltiples formatos con validación extensible
- **Organización automática**: Carpetas por entidad con estrategia personalizable
- **Descarga segura**: Control de acceso por autenticación y roles
- **Metadatos completos**: Descripción, tipo MIME, tamaño, fecha de subida, entidad relacionada
- **Límite de tamaño**: 10MB por archivo por defecto (configurable)
- **Factory Pattern**: Fácil extensión para nuevas entidades

### Arquitectura de Estrategias

El sistema utiliza el patrón Strategy para desacoplar la lógica de almacenamiento:

- **StorageStrategy Interface**: Contrato común para todas las estrategias
- **StorageFactory**: Fábrica que selecciona la estrategia según `entityType`
- **Estrategias concretas**: `EmployeeFileStrategy`, `CompanyFileStrategy`

### Endpoint de Subida

```
POST /api/server-files/upload
```

**Headers requeridos:**

```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Campos del formulario:**

- `file` _(requerido)_: Archivo binario
- `entityType` _(requerido)_: Tipo de entidad (`EMPLOYEE` o `COMPANY`)
- `entityId` _(requerido)_: ID de la entidad
- `description` _(opcional)_: Descripción del archivo (máx. 500 caracteres)

**Reglas de validación:**

- ✅ `entityType` y `entityId` requeridos
- ✅ Archivo requerido
- ✅ Tamaño máximo: 10MB
- ✅ Tipos de archivo permitidos: Todos (validación extensible)
- ✅ Entidad debe existir en la base de datos

### Estructura de Organización

Los archivos se organizan automáticamente en `storage/` (fuera de `src/`):

**Empleados:** `storage/uploads/employees/<apellido>_<nombre>_<dni>/`

```
storage/uploads/employees/
├── gomez_juan_12345678/
│   ├── 1730000000000-12345.pdf
│   └── 1730000000001-67890.docx
└── perez_maria_87654321/
    └── 1730000000002-11111.jpg
```

**Empresas:** `storage/uploads/companies/<nombre>_<cuit>/`

```
storage/uploads/companies/
├── acme_sa_30-12345678-9/
│   ├── 1730000000003-22222.pdf
│   └── 1730000000004-33333.xlsx
└── tech_corp_30-98765432-1/
    └── 1730000000005-44444.png
```

### Endpoints CRUD

- `GET /api/server-files` - Listar archivos (con filtros por entidad)
- `GET /api/server-files/:id` - Obtener metadatos del archivo
- `GET /api/server-files/:id/download` - Descargar archivo
- `PUT /api/server-files/:id` - Actualizar metadatos
- `DELETE /api/server-files/:id` - Eliminar archivo y registro

### Ejemplos de Uso

**Subida con cURL (PowerShell):**

```powershell
curl.exe -X POST "http://localhost:3000/api/server-files/upload" `
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." `
  -F "file=@C:\path\to\document.pdf" `
  -F "entityType=EMPLOYEE" `
  -F "entityId=1" `
  -F "description=Contrato de trabajo firmado"
```

**Subida con cURL (Bash):**

```bash
curl -X POST "http://localhost:3000/api/server-files/upload" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "file=@/path/to/document.pdf" \
  -F "entityType=COMPANY" \
  -F "entityId=1" \
  -F "description=Contrato de servicios"
```

**Descarga de archivo:**

```bash
curl -X GET "http://localhost:3000/api/server-files/123/download" \
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
    Company ||--o{ HistoryLog : logs

    Person ||--o{ Employee : is
    Person ||--o{ Contact : has
    Person ||--o{ Address : lives
    Person ||--|| Family : related

    Employee ||--o{ EmployeeVacation : takes
    Employee ||--o{ Document : owns
    Employee ||--o{ Inspection : performs
    Employee ||--o{ EmployeeIncident : has
    Employee ||--o{ HistoryLog : logs

    Equipment ||--o{ Inspection : undergoes
    Equipment ||--o{ EquipmentMaintenance : receives
    Equipment ||--o{ Document : has
    Equipment ||--o{ TireAssignment : has_tires
    Equipment ||--o{ EquipmentAxle : configured
    Equipment ||--o{ HistoryLog : logs

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
- **TirePosition**: DI, DD, E1I, E1D, E2I, E2D, etc. (delanteros, ejes traseros, duales)
- **TireEventType**: ASSIGNMENT, UNASSIGNMENT, ROTATION, INSPECTION, RECAP, DISCARD, OTHER

##### Historial y Auditoría

- **HistoryType**: EMPLOYEE_ILLNESS, EMPLOYEE_WARNING, VACATION_ASSIGNED, EQUIPMENT_MAINTENANCE, etc.
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

## 🔄 Standardization of findAll and findOne

### Overview

All service modules must implement standardized `findAll` and `findOne` methods using the shared BaseService class.
This ensures consistency, predictable responses, and ease of integration across the backend and frontend.

### findAll

- Must support pagination parameters: `page`, `limit`
- Must support optional search parameter: `q`
- Must support optional sorting: `sortBy`, `sortOrder`
- Always return:
  ```json
  {
    "data": [...],
    "meta": {
      "total": number,
      "page": number,
      "limit": number,
      "totalPages": number
    }
  }
  ```
- Excludes soft-deleted records by default (`deletedAt: null`)
- Default sorting: `createdAt desc`
- Default pagination: `page=1, limit=10`

### findOne

- Uses centralized BaseService method with `findUniqueOrThrow`
- Always performs query with `where: { id, deletedAt: null }`
- Wraps with consistent try/catch block that throws `NotFoundException`
- Message format: `Entity <EntityName> with ID <id> not found`
- Should include necessary relations where relevant
- Must exclude sensitive information (e.g., user passwords, internal tokens)

### BaseService Architecture

```typescript
export abstract class BaseService<T> {
  protected abstract getModel(): any;
  protected abstract buildSearchConditions(q: string): any[];

  async findAll(
    query: BaseQueryDto,
    additionalWhere: any = {},
    include?: any
  ): Promise<BaseResponseDto<T>>;
  async findOne(id: number | string, include?: any): Promise<T>;
  async create(data: Partial<T>): Promise<T>;
  async update(id: number | string, data: Partial<T>): Promise<T>;
  async remove(id: number | string): Promise<void>; // Soft delete
}
```

### For New Modules

- Always extend BaseService when possible
- Implement `getModel()` to return the Prisma model
- Implement `buildSearchConditions(q: string)` for searchable fields
- Maintain naming conventions and consistent return structure
- Add both unit and e2e tests for findAll and findOne

### Standardized Services

The following services have been refactored to use BaseService:

- UsersService
- CompaniesService
- EquipmentService
- TiresService
- EmployeesService
- PersonsService

## 🔄 Standardization of findAll and findOne

### Overview

All service modules must implement standardized `findAll` and `findOne` methods using the shared BaseService class.
This ensures consistency, predictable responses, and ease of integration across the backend and frontend.

### findAll

- Must support pagination with `page` and `limit` parameters
- Supports optional search with `q` parameter
- Supports optional sorting with `sortBy` and `sortOrder` parameters
- Automatically excludes soft-deleted records (`deletedAt: null`)
- Returns standardized response structure:
  ```json
  {
    "data": [...],
    "meta": {
      "total": number,
      "page": number,
      "limit": number,
      "totalPages": number
    }
  }
  ```
- Default sorting: `createdAt desc`
- Default pagination: `page=1, limit=10`

### findOne

- Uses centralized BaseService method with consistent error handling
- Always performs query using `findUniqueOrThrow({ where: { id }, include })`
- Wraps with consistent try/catch block that throws `NotFoundException`
- Message format: `Entity <EntityName> with ID <id> not found`
- Excludes sensitive data (e.g., user passwords, internal tokens)
- Includes related entities where relevant

### BaseService Architecture

- Abstract class in `/src/common/services/base.service.ts`
- Provides `findAll()` and `findOne()` with standardized logic
- Services extend BaseService and implement `getModel()` and `buildSearchConditions()`
- Reduces code duplication and ensures consistency

### For New Modules

- Always extend BaseService when possible
- Implement `getModel()` to return the Prisma model
- Override `buildSearchConditions(q: string)` for custom search logic
- Maintain naming conventions and consistent return structure
- Add both unit and e2e tests for findAll and findOne

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
  "moduleNameMapper": {
    "^src/(.*)$": "<rootDir>/../src/$1"
  },
  "collectCoverageFrom": ["src/**/*.(t|j)s"],
  "coverageDirectory": "coverage-e2e",
  "verbose": true
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
RUN npm run build && ls -la dist/
RUN date > dummy

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
COPY --from=builder --chown=nestjs:nodejs /app/src ./src
COPY --from=builder --chown=nestjs:nodejs /app/assets ./assets

# Variables de entorno
USER nestjs
ENV NODE_ENV=production
ENV PORT=3005
EXPOSE 3005

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3005', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Comando de inicio
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

### 🧹 Soft Delete Implementation (Guided Refactor)

- Added `isActive` and `deletedAt` fields to all main entities, following BaseModel convention.
- Allows logical deletion and consistent entity visibility across the system.
- Each affected model includes `@@index([deletedAt])` for efficient filtering.
- Run `npx prisma generate` after merging these changes.

### 🗑️ Soft Delete Fields Summary

| Model          | Soft Delete Added | DeletedAt Indexed | Notes                     |
| -------------- | ----------------- | ----------------- | ------------------------- |
| Company        | ✅                | ✅                | Main business entity      |
| Employee       | ✅                | ✅                | HR management             |
| Equipment      | ✅                | ✅                | Fleet management          |
| Product        | ✅                | ✅                | Product catalog           |
| Tire           | ✅                | ✅                | Tire lifecycle management |
| Person         | ✅                | ✅                | Physical persons          |
| Document       | ✅                | ✅                | File management           |
| Inspection     | ✅                | ✅                | Technical control         |
| HistoryLog     | ✅                | ✅                | Audit logs                |
| Part           | ✅                | ✅                | Parts catalog             |
| EquipmentModel | ✅                | ✅                | Equipment specifications  |

- [Swagger](https://swagger.io/) - Documentación API

**Contribuciones bienvenidas** 🚀
