// filepath: sae-backend/src/reports/core/report-result.ts
export interface ReportResult {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  metadata?: Record<string, any>;
}
