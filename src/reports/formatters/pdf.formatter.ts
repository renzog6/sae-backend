// filepath: src/reports/formatters/pdf.formatter.ts
import { Injectable } from "@nestjs/common";
import { ReportFormatter } from "./report-formatter";
import { ReportContext } from "../core/report-context";
import { ReportResult } from "../core/report-result";
import PDFDocument from "pdfkit";

@Injectable()
export class PdfFormatter implements ReportFormatter {
  readonly format = "pdf";

  async render(context: ReportContext): Promise<ReportResult> {
    const doc = new PDFDocument({ margin: 30 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));

    doc.fontSize(20).text(context.title, { align: "center" });
    doc.moveDown();

    const headers = context.columns.map((c) => c.header).join(" | ");
    doc.fontSize(12).text(headers);
    doc.moveDown();

    context.rows.forEach((row) => {
      const line = context.columns.map((c) => row[c.key]).join(" | ");
      doc.text(line);
    });

    doc.end();

    return {
      buffer: Buffer.concat(chunks),
      fileName: `${context.fileName}.pdf`,
      mimeType: "application/pdf",
      metadata: context.metadata,
    };
  }
}
