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
│   ├── schema.prisma          # Esquema de base de datos
│   └── seed.ts               # Datos de prueba
├── src/
│   ├── auth/                 # Módulo de autenticación
│   ├── locations/            # Módulo de ubicaciones
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── locations.controller.ts
│   │   ├── locations.service.ts
│   │   └── locations.module.ts
│   ├── prisma/              # Servicio de Prisma
│   ├── app.module.ts        # Módulo principal
│   └── main.ts             # Punto de entrada
├── test/                    # Pruebas
└── package.json
```

## 📚 API Endpoints

### Autenticación

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `GET /auth/profile` - Obtener perfil del usuario

### Ubicaciones

#### Countries (Países)

- `GET /locations/countries` - Listar todos los países
- `GET /locations/countries/:id` - Obtener país por ID
- `GET /locations/countries/:id/provinces` - Obtener provincias de un país

#### Provinces (Provincias)

- `GET /locations/provinces` - Listar todas las provincias
- `GET /locations/provinces/:id` - Obtener provincia por ID
- `GET /locations/provinces/code/:code` - Obtener provincia por código
- `GET /locations/provinces/:id/cities` - Obtener ciudades de una provincia

#### Cities (Ciudades)

- `GET /locations/cities` - Listar todas las ciudades
- `GET /locations/cities/:id` - Obtener ciudad por ID
- `POST /locations/cities` - Crear nueva ciudad
- `PATCH /locations/cities/:id` - Actualizar ciudad
- `DELETE /locations/cities/:id` - Eliminar ciudad
- `GET /locations/cities/province/:provinceId` - Obtener ciudades por provincia
- `GET /locations/cities/postal-code/:postalCode` - Obtener ciudad por código postal

#### Addresses (Direcciones)

- `GET /locations/addresses` - Listar todas las direcciones
- `GET /locations/addresses/:id` - Obtener dirección por ID
- `POST /locations/addresses` - Crear nueva dirección
- `PATCH /locations/addresses/:id` - Actualizar dirección
- `DELETE /locations/addresses/:id` - Eliminar dirección
- `GET /locations/addresses/city/:cityId` - Obtener direcciones por ciudad
- `GET /locations/addresses/company/:companyId` - Obtener direcciones por empresa

## 📖 Documentación API

Una vez que el servidor esté ejecutándose, puedes acceder a la documentación interactiva de Swagger en:

```
http://localhost:3000/api
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
