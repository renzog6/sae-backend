export class UpdateDocumentDto {
  filename?: string;
  mimetype?: string;
  size?: number;
  path?: string;
  description?: string | null;
  employeeId?: number | null;
  companyId?: number | null;
}
