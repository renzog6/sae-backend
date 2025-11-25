// filepath: sae-backend/src/reports/formatters.providers.ts

import { XLSXFormatter } from "./formatters/xlsx.formatter";
import { PDFFormatter } from "./formatters/pdf.formatter";
import { CSVFormatter } from "./formatters/csv.formatter";
import { DOCXFormatter } from "./formatters/docx.formatter";

export const FormatterProviders = [
  XLSXFormatter,
  PDFFormatter,
  CSVFormatter,
  DOCXFormatter,
];
