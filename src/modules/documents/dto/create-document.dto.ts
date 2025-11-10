//filepath: sae-backend/src/modules/documents/dto/create-document.dto.ts
export class CreateDocumentDto {
  filename!: string;
  mimetype!: string;
  size!: number;
  path!: string; // absolute or relative storage path
  description?: string;
  employeeId?: number;
  companyId?: number;
}
