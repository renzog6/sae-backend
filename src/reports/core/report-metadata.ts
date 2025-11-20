// src/reports/core/report-metadata.ts
/**
 * Metadata produced for each report generation.
 * Useful for audits, UI display, debugging and traceability.
 */
export interface ReportMetadata {
  /** ISO timestamp when the report was generated */
  generatedAt: string;

  /** Who or which system generated the report (optional) */
  generatedBy?: string;

  /** Human readable title (may be provided by client or strategy) */
  title?: string;

  /** Original filters and parameters used to create the report (raw) */
  filters?: Record<string, any> | null;

  /** Number of records produced (if applicable) */
  totalRecords?: number;

  /** Processing time in milliseconds (optional, filled by pipeline) */
  processingTimeMs?: number;

  /** Warnings or notes produced during generation (validation, truncation, fallbacks) */
  warnings?: string[];

  /** Engine / formatter information (eg. "exceljs@4.3.0") */
  engine?: string;

  /** Any additional, format-specific metadata */
  extras?: Record<string, any>;
}

/** Utility: create a minimal metadata object */
export function createDefaultMetadata(
  partial?: Partial<ReportMetadata>
): ReportMetadata {
  return {
    generatedAt: new Date().toISOString(),
    generatedBy: partial?.generatedBy,
    title: partial?.title,
    filters: partial?.filters ?? null,
    totalRecords: partial?.totalRecords ?? 0,
    processingTimeMs: partial?.processingTimeMs,
    warnings: partial?.warnings ?? [],
    engine: partial?.engine,
    extras: partial?.extras ?? {},
  };
}
