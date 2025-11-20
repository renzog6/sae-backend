// filepath: src/reports/core/report-result.ts
import { ReportMetadata } from "./report-metadata";

export interface ReportResult {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  metadata: ReportMetadata;
}
