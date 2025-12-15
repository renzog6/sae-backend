# Documentación del Módulo Companies

## Estructura General
El módulo [CompaniesModule](file:///c:/workspace-nextjs/sae-web-ia/sae-backend/src/modules/companies/companies.module.ts#8-19) se encuentra en `src/modules/companies` y agrupa la lógica relacionada con empresas y sus categorizaciones.

### Directorio
`src/modules/companies`

### Submódulos
1.  **Companies** (Principal)
2.  **Business Categories** (Categorías de negocio)
3.  **Business Subcategories** (Subcategorías de negocio)

---

## Endpoints

Todos los controladores extienden de `BaseController`, por lo que heredan los siguientes endpoints estándar (además de los específicos listados):

| Método | Endpoint Generico | Descripción | Roles |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Listar registros (paginado, con filtros) | Usuario autenticado |
| `GET` | `/:id` | Obtener un registro por ID | Usuario autenticado |
| `POST` | `/` | Crear un nuevo registro | Usuario autenticado |
| `PUT` | `/:id` | Actualizar un registro existente | Usuario autenticado |
| `DELETE` | `/:id` | Eliminar registro (Soft Delete si aplica) | Usuario autenticado (o Admin, según override) |
| `PATCH` | `/:id/restore` | Restaurar registro eliminado (Soft Delete) | Admin (según override) |
| `DELETE` | `/:id/force` | Eliminado físico permanente | Usuario autenticado |

### 1. Companies (Empresas)
*   **Controller:** `CompaniesController`
*   **Base Path:** `/api/companies`
*   **Entidad:** `Company`
*   **Endpoints Específicos / Overrides:**
    *   `DELETE /:id`: Requiere rol **ADMIN**.

### 2. Business Categories (Rubros)
*   **Controller:** `BusinessCategoriesController`
*   **Base Path:** `/api/business-categories`
*   **Entidad:** `BusinessCategory`
*   **Endpoints Específicos / Overrides:**
    *   `DELETE /:id`: Requiere rol **ADMIN**.
    *   `PATCH /:id/restore`: Requiere rol **ADMIN**.

### 3. Business Subcategories (Sub-rubros)
*   **Controller:** `BusinessSubcategoriesController`
*   **Base Path:** `/api/companies/subcategories`
*   **Entidad:** `BusinessSubCategory`
*   **Endpoints Específicos / Overrides:**
    *   `DELETE /:id`: Requiere rol **ADMIN**.
    *   `PATCH /:id/restore`: Requiere rol **ADMIN**.

> **Nota:** Todos los endpoints requieren autenticación mediante Token Bearer (`Authorization: Bearer <token>`).
