// filepath: sae-backend/src/reports/core/report-context.ts
export interface ReportColumn {
  key: string;
  header: string;
  width?: number;

  /** "string" | "number" | "date" | "boolean" */
  type?: string;

  /** ExcelJS numFmt (solo para number/date) */
  format?: string;

  /** Estilos opcionales para excel / pdf */
  style?: {
    header?: Record<string, any>;
    data?: Record<string, any>;
  };
}

export interface ReportStyleDefaults {
  header?: Record<string, any>;
  data?: Record<string, any>;
}

export interface ReportContext {
  title: string;
  columns: ReportColumn[];
  rows: any[];

  metadata?: Record<string, any>;
  styles?: ReportStyleDefaults;
}

export function createReportContext(ctx: ReportContext): ReportContext {
  return ctx;
}
