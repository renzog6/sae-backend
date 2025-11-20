// filepath: src/reports/core/report-context.ts
import { ReportMetadata } from "./report-metadata";

export interface ReportColumn {
  key: string;
  header: string;
  width?: number | string;
  format?: (value: any) => string | number;
  style?: {
    header?: {
      bold?: boolean;
      alignment?: "left" | "center" | "right";
    };
    data?: {
      alignment?: "left" | "center" | "right";
    };
  };
}

export interface ReportContext {
  title: string;
  columns: ReportColumn[];
  rows: Record<string, any>[];
  format: string;
  fileName: string;
  mimeType: string;
  metadata: ReportMetadata;
  options?: Record<string, any>;
}

export function createReportContext(
  params: Partial<ReportContext> & {
    title: string;
    columns: ReportColumn[];
    rows?: Record<string, any>[];
  }
): ReportContext {
  return {
    title: params.title,
    columns: params.columns,
    rows: params.rows ?? [],
    format: params.format ?? "",
    fileName: params.fileName ?? "report",
    mimeType: params.mimeType ?? "application/octet-stream",
    metadata: params.metadata ?? { generatedAt: new Date().toISOString() },
    options: params.options ?? {},
  };
}
