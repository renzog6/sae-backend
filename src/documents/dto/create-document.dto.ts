export class CreateDocumentDto {
  filename!: string;
  mimetype!: string;
  size!: number;
  path!: string; // absolute or relative storage path
  description?: string;
  employeeId?: number;
  companyId?: number;
}
