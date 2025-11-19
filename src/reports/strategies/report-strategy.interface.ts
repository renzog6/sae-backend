// filepath: sae-backend/src/reports/strategies/report-strategy.interface.ts

/**
 * Interface for report generation strategies.
 * Defines the contract that all report strategies must implement.
 */
export interface ReportStrategy {
  /** The filename for the generated report */
  fileName: string;

  /** The output format type */
  outputType: "excel" | "pdf";

  /** The MIME type for the generated file */
  mimeType: string;

  /** Generates the report buffer based on filters */
  generate(filters: Record<string, any>): Promise<Buffer>;

  /** Maps raw data for the report (optional implementation) */
  map?(data: any): Promise<any>;
}
