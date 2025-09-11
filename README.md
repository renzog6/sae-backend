# SAE Backend

API para el Sistema de Administración Empresarial (SAE) desarrollada con NestJS y Prisma ORM.

## Descripción

Este proyecto es una API RESTful que proporciona servicios para la gestión de empresas, contactos, empleados, equipos, inspecciones y ubicaciones. Está construido con NestJS, Prisma ORM y MySQL.

## Requisitos previos

- Node.js (v16 o superior)
- MySQL (v8 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio.

   ```bash
   git clone <url-del-repositorio>
   cd sae-backend
   ```

2. Instalar dependencias.

   ```bash
   npm install
   ```

3. Configurar variables de entorno

   Copiar el archivo `.env.example` a `.env` y configurar las variables de entorno según sea necesario.

   ```bash
   cp .env.example .env
   ```

4. Configurar la base de datos

```bash
npm run db:setup
```

Este comando realizará las siguientes acciones:

- Generar el cliente Prisma
- Ejecutar las migraciones de la base de datos
- Poblar la base de datos con datos iniciales

## Ejecución

### Desarrollo

```bash
npm run start:dev
```

### Producción

```bash
npm run build
npm run start:prod
```

## Documentación de la API

La documentación de la API está disponible en la ruta `/api/docs` cuando el servidor está en ejecución.

## Características principales

- Autenticación y autorización con JWT
- Gestión de usuarios y roles
- Gestión de empresas y contactos
- Gestión de empleados
- Gestión de equipos e inspecciones
- Gestión de ubicaciones

## Estructura del proyecto

src/
├── auth/ # Módulo de autenticación
├── common/ # Componentes comunes (decoradores, filtros, etc.)
├── companies/ # Módulo de empresas
├── contacts/ # Módulo de contactos
├── employees/ # Módulo de empleados
├── equipment/ # Módulo de equipos
├── inspections/ # Módulo de inspecciones
├── locations/ # Módulo de ubicaciones
├── prisma/ # Servicio y módulo de Prisma
├── users/ # Módulo de usuarios
├── app.module.ts # Módulo principal de la aplicación
└── main.ts # Punto de entrada de la aplicación

## Credenciales por defecto

Después de ejecutar el seed, se creará un usuario administrador con las siguientes credenciales:

- Email: <admin@example.com>
- Contraseña: admin123

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
