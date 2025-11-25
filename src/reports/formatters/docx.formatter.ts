// filepath: sae-backend/src/reports/formatters/docx.formatter.ts

import { Injectable } from "@nestjs/common";
import { ReportFormatter } from "./report-formatter.interface";
import { ReportContext } from "../core/report-context";
import { ReportResult } from "../core/report-result";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
} from "docx";

@Injectable()
export class DOCXFormatter implements ReportFormatter {
  readonly format = "docx";

  async render(context: ReportContext): Promise<ReportResult> {
    const title = new Paragraph({
      text: context.title,
      heading: HeadingLevel.HEADING_1,
    });

    const headerRow = new TableRow({
      children: context.columns.map(
        (col) => new TableCell({ children: [new Paragraph(col.header)] })
      ),
    });

    const dataRows = context.rows.map(
      (row) =>
        new TableRow({
          children: context.columns.map(
            (col) =>
              new TableCell({
                children: [new Paragraph(String(row[col.key] ?? ""))],
              })
          ),
        })
    );

    const table = new Table({
      rows: [headerRow, ...dataRows],
    });

    const doc = new Document({
      sections: [
        {
          children: [title, table],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    return {
      buffer,
      fileName: `${context.metadata?.fileName ?? "report"}.docx`,
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      metadata: context.metadata ?? {},
    };
  }
}
