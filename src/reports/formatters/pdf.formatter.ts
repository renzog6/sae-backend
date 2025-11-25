// filepath: sae-backend/src/reports/formatters/pdf.formatter.ts

import { Injectable } from "@nestjs/common";
import { ReportFormatter } from "./report-formatter.interface";
import { ReportContext } from "../core/report-context";
import { ReportResult } from "../core/report-result";
import PDFDocument = require("pdfkit");

@Injectable()
export class PDFFormatter implements ReportFormatter {
  readonly format = "pdf";

  async render(context: ReportContext): Promise<ReportResult> {
    const doc = new PDFDocument({ margin: 40 });
    const buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));
    const endPromise = new Promise<Buffer>((resolve) =>
      doc.on("end", () => resolve(Buffer.concat(buffers)))
    );

    // Title
    doc.fontSize(20).text(context.title, { align: "center" });
    doc.moveDown();

    // Table header
    doc.fontSize(12);
    context.columns.forEach((col) => {
      doc.text(col.header + "   ", { continued: true });
    });
    doc.moveDown();

    // Rows
    context.rows.forEach((row) => {
      context.columns.forEach((col) => {
        doc.text(String(row[col.key] ?? ""), { continued: true });
      });
      doc.moveDown();
    });

    doc.end();

    const pdfBuffer = await endPromise;

    return {
      buffer: pdfBuffer,
      fileName: `${context.metadata?.fileName ?? "report"}.pdf`,
      mimeType: "application/pdf",
      metadata: context.metadata ?? {},
    };
  }
}
