# Server Files Module Migration Walkthrough

We have successfully migrated the legacy `documents` module to a robust, Strategy-based `server-files` module and reorganized the file storage structure.

## 1. New Storage Structure

Files are now stored in the project root under `storage/`, keeping `src/` clean.

```text
sae-backend/
├── storage/
│   ├── uploads/
│   │   ├── employees/  <-- Organized by Employee
│   │   ├── companies/  <-- Organized by Company
│   │   └── temp/       <-- Temporary upload staging
│   └── reports/        <-- Generated reports
```

## 2. Server Files Module Architecture

The new module uses the **Strategy Pattern** to decouple file handling logic from the controller.

### Key Components

- **`StorageStrategy` Interface**: Defines how to handle files for an entity.
- **`StorageFactory`**: Selects the correct strategy based on `entityType`.
- **`ServerFilesService`**: Orchestrates the upload, move, and DB recording process.
- **Strategies**:
    - `EmployeeFileStrategy`: Saves to `employees/Last_First_DNI`.
    - `CompanyFileStrategy`: Saves to `companies/Name_CUIT`.

## 3. API Usage

### Upload File

**Endpoint**: `POST /api/server-files/upload`
**Content-Type**: `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `file` | File | The file to upload |
| `entityType` | Enum | `EMPLOYEE` or `COMPANY` |
| `entityId` | Integer | ID of the entity |
| `description` | String | Optional description |

**Example (cURL)**:
```bash
curl -X POST http://localhost:3000/api/server-files/upload \
  -F "file=@/path/to/contract.pdf" \
  -F "entityType=EMPLOYEE" \
  -F "entityId=1" \
  -F "description=Contrato 2024"
```

### Download File

**Endpoint**: `GET /api/server-files/:id/download`

## 4. Extending the System

To add support for a new entity (e.g., `EQUIPMENT`):

1.  Create `EquipmentFileStrategy` implementing `StorageStrategy`.
2.  Add `EQUIPMENT` to `ServerFileType` enum.
3.  Register the new strategy in `StorageFactory` and `ServerFilesModule`.

No changes to the controller or service are needed!
