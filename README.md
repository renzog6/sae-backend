# SAE Backend - Sistema de Administración Empresarial

## 📋 Descripción

SAE Backend es una API REST robusta desarrollada con NestJS para la gestión integral de equipos, ubicaciones, usuarios y procesos de inspección. El sistema proporciona una arquitectura escalable y moderna para administrar recursos empresariales de manera eficiente.

## 🚀 Tecnologías

- **Framework**: NestJS 10.x
- **Base de Datos**: MySQL con Prisma ORM
- **Autenticación**: JWT (JSON Web Tokens)
- **Documentación**: Swagger/OpenAPI
- **Validación**: class-validator y class-transformer
- **Testing**: Jest
- **Lenguaje**: TypeScript

## 📁 Estructura del Proyecto

```
sae-backend/
├── prisma/
│   ├── schema.prisma               # Esquema de base de datos
│   ├── seed.ts                     # Seed principal (países, provincias, ciudades, catálogos)
│   └── seed-companies.ts           # Seed de categorías de negocio y empresas (desde JSON)
├── src/
│   ├── app.module.ts               # Módulo raíz de la aplicación
│   ├── main.ts                     # Bootstrap (prefijo global, Swagger, CORS)
│   ├── prisma/                     # Integración con Prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── auth/                       # Autenticación y seguridad (JWT)
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── decorators/
│   │   └── guards/
│   ├── common/                     # Utilidades compartidas (DTOs, guards, decorators)
│   │   ├── decorators/
│   │   ├── dto/
│   │   └── guards/
│   ├── catalogs/                   # Catálogos (marcas, unidades)
│   │   ├── brands/
│   │   │   ├── brands.controller.ts
│   │   │   ├── brands.module.ts
│   │   │   └── brands.service.ts
│   │   └── units/
│   │       ├── units.controller.ts
│   │       ├── units.module.ts
│   │       └── units.service.ts
│   ├── companies/                  # Empresas y rubros
│   │   ├── companies.controller.ts
│   │   ├── companies.module.ts
│   │   ├── companies.service.ts
│   │   ├── business-categories/
│   │   │   ├── business-categories.controller.ts
│   │   │   ├── business-categories.module.ts
│   │   │   └── business-categories.service.ts
│   │   └── business-subcategories/
│   │       ├── business-subcategories.controller.ts
│   │       ├── business-subcategories.module.ts
│   │       └── business-subcategories.service.ts
│   ├── contacts/                   # Contactos
│   │   ├── contacts.controller.ts
│   │   ├── contacts.module.ts
│   │   └── contacts.service.ts
│   ├── equipment/                  # Equipos, categorías, tipos y modelos
│   │   ├── equipment.controller.ts
│   │   ├── equipment.module.ts
│   │   └── equipment.service.ts
│   ├── inspections/                # Inspecciones
│   │   ├── inspections.controller.ts
│   │   ├── inspections.module.ts
│   │   └── inspections.service.ts
│   ├── locations/                  # Ubicaciones (países, provincias, ciudades, direcciones)
│   │   ├── dto/
│   │   ├── locations.controller.ts
│   │   ├── locations.module.ts
│   │   └── locations.service.ts
│   ├── users/                      # Usuarios
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── employees/                  # Empleados
│   │   ├── employees.controller.ts
│   │   ├── employees.module.ts
│   │   └── employees.service.ts
│   ├── health/                     # Health check
│   │   ├── health.controller.ts
│   │   └── health.module.ts
│   ├── persons/                    # (reservado)
│   └── uploads/                    # (reservado)
└── package.json
```

## 📚 API Endpoints

Nota: La aplicación define un prefijo global configurable para la API. Por defecto es `api` (ver `src/main.ts`: `app.setGlobalPrefix(apiPrefix)`). Por lo tanto, todos los endpoints quedan bajo `/api/...` a menos que se cambie `API_PREFIX`.

### Autenticación (`/auth`)

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Refrescar token de acceso
- `GET /api/auth/profile` - Obtener perfil del usuario (requiere Bearer Token)

### Salud (`/health`)

- `GET /api/health` - Health check público

### Ubicaciones (`/locations`)

#### Countries (Países)

- `GET /api/locations/countries` - Listar todos los países
- `GET /api/locations/countries/:id` - Obtener país por ID
- `GET /api/locations/countries/:id/provinces` - Obtener provincias de un país

#### Provinces (Provincias)

- `GET /api/locations/provinces` - Listar todas las provincias
- `GET /api/locations/provinces/:id` - Obtener provincia por ID
- `GET /api/locations/provinces/code/:code` - Obtener provincia por código

#### Cities (Ciudades)

- `GET /api/locations/cities` - Listar todas las ciudades
- `GET /api/locations/cities/:id` - Obtener ciudad por ID
- `POST /api/locations/cities` - Crear nueva ciudad
- `PATCH /api/locations/cities/:id` - Actualizar ciudad
- `DELETE /api/locations/cities/:id` - Eliminar ciudad
- `GET /api/locations/cities/province/:provinceId` - Obtener ciudades por provincia
- `GET /api/locations/cities/postal-code/:postalCode` - Obtener ciudad por código postal

#### Addresses (Direcciones)

- `GET /api/locations/addresses` - Listar todas las direcciones
- `GET /api/locations/addresses/:id` - Obtener dirección por ID
- `POST /api/locations/addresses` - Crear nueva dirección
- `PATCH /api/locations/addresses/:id` - Actualizar dirección
- `DELETE /api/locations/addresses/:id` - Eliminar dirección
- `GET /api/locations/addresses/city/:cityId` - Obtener direcciones por ciudad
- `GET /api/locations/addresses/company/:companyId` - Obtener direcciones por empresa

### Empresas (`/companies`)

- `POST /api/companies` - Crear empresa (ADMIN o MANAGER, requiere Bearer)
- `GET /api/companies` - Listar empresas (paginación)
- `GET /api/companies/:id` - Obtener empresa por ID
- `PATCH /api/companies/:id` - Actualizar empresa (ADMIN o MANAGER)
- `DELETE /api/companies/:id` - Eliminar empresa (solo ADMIN)

#### Categorías de negocio (`/companies/categories`)

- `GET /api/companies/categories` - Listar categorías de negocio
- `GET /api/companies/categories/:id` - Obtener categoría por ID
- `POST /api/companies/categories` - Crear categoría (ADMIN o MANAGER)
- `PATCH /api/companies/categories/:id` - Actualizar categoría (ADMIN o MANAGER)
- `DELETE /api/companies/categories/:id` - Eliminar categoría (solo ADMIN)

#### Subcategorías de negocio (`/companies/subcategories`)

- `GET /api/companies/subcategories` - Listar subcategorías (opcional `?categoryId=`)
- `GET /api/companies/subcategories/:id` - Obtener subcategoría por ID
- `POST /api/companies/subcategories` - Crear subcategoría (ADMIN o MANAGER)
- `PATCH /api/companies/subcategories/:id` - Actualizar subcategoría (ADMIN o MANAGER)
- `DELETE /api/companies/subcategories/:id` - Eliminar subcategoría (solo ADMIN)

### Contactos (`/contacts`)

- `POST /api/contacts` - Crear contacto (ADMIN o MANAGER)
- `GET /api/contacts` - Listar contactos (paginación)
- `GET /api/contacts/company/:companyId` - Listar contactos por empresa (paginación)
- `GET /api/contacts/:id` - Obtener contacto por ID
- `PATCH /api/contacts/:id` - Actualizar contacto (ADMIN o MANAGER)
- `DELETE /api/contacts/:id` - Eliminar contacto (solo ADMIN)

### Equipos (`/equipment`)

- `POST /api/equipment` - Crear equipo (ADMIN o MANAGER, requiere Bearer)
- `GET /api/equipment` - Listar equipos (paginación; opcional `?companyId=`)
- `GET /api/equipment/:id` - Obtener equipo por ID
- `PATCH /api/equipment/:id` - Actualizar equipo (ADMIN o MANAGER)
- `DELETE /api/equipment/:id` - Eliminar equipo (solo ADMIN)
- `GET /api/equipment/categories/all` - Listar categorías de equipos
- `GET /api/equipment/types/all` - Listar tipos de equipos (opcional `?categoryId=`)
- `GET /api/equipment/models/all` - Listar modelos de equipos (opcional `?typeId=`)

### Catálogos

#### Marcas (`/brands`)

- `POST /api/brands` - Crear marca
- `GET /api/brands` - Listar marcas
- `GET /api/brands/:id` - Obtener marca por ID
- `PATCH /api/brands/:id` - Actualizar marca
- `DELETE /api/brands/:id` - Eliminar marca

#### Unidades (`/units`)

- `POST /api/units` - Crear unidad
- `GET /api/units` - Listar unidades
- `GET /api/units/:id` - Obtener unidad por ID
- `PATCH /api/units/:id` - Actualizar unidad
- `DELETE /api/units/:id` - Eliminar unidad

### Usuarios (`/users`)

- `POST /api/users` - Crear usuario (solo ADMIN)
- `GET /api/users` - Listar usuarios (solo ADMIN, paginación)
- `GET /api/users/:id` - Obtener usuario por ID (solo ADMIN)
- `PATCH /api/users/:id` - Actualizar usuario (solo ADMIN)
- `DELETE /api/users/:id` - Eliminar usuario (solo ADMIN)

### Inspecciones (`/inspections`)

- `GET /api/inspections` - Listar inspecciones
- `GET /api/inspections/:id` - Obtener inspección por ID
- `GET /api/inspections/types` - Listar tipos de inspección

### Empleados (`/employees`)

- `GET /api/employees` - Listar empleados
- `GET /api/employees/:id` - Obtener empleado por ID

## 📖 Documentación API

Una vez que el servidor esté ejecutándose, puedes acceder a la documentación interactiva de Swagger en:

```
http://localhost:3000/api/docs
```

## 🗄️ Modelo de Datos

### Entidades Principales

#### Country (País)

- `id`: Identificador único
- `name`: Nombre del país
- `code`: Código ISO del país
- `provinces`: Relación con provincias

#### Province (Provincia)

- `id`: Identificador único
- `name`: Nombre de la provincia
- `code`: Código de la provincia
- `countryId`: Referencia al país
- `cities`: Relación con ciudades

#### City (Ciudad)

- `id`: Identificador único
- `name`: Nombre de la ciudad
- `postalCode`: Código postal
- `provinceId`: Referencia a la provincia
- `addresses`: Relación con direcciones

#### Address (Dirección)

- `id`: Identificador único
- `street`: Calle
- `number`: Número
- `floor`: Piso (opcional)
- `apartment`: Departamento (opcional)
- `postalCode`: Código postal
- `neighborhood`: Barrio (opcional)
- `reference`: Referencia (opcional)
- `latitude`: Latitud (opcional)
- `longitude`: Longitud (opcional)
- `cityId`: Referencia a la ciudad
- `isActive`: Estado activo

## 🔐 Autenticación

El sistema utiliza JWT para la autenticación. Para acceder a endpoints protegidos:

1. Obtener token mediante `/auth/login`
2. Incluir token en headers: `Authorization: Bearer <token>`

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas:

- Email: soporte@sae.com
- Issues: [GitHub Issues](link-to-issues)

---

**Desarrollado con ❤️ usando NestJS**
