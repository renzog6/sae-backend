// filepath: src/reports/formatters/docx.formatter.ts
import { Injectable } from "@nestjs/common";
import { ReportFormatter } from "./report-formatter";
import { ReportContext } from "../core/report-context";
import { ReportResult } from "../core/report-result";

import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";

@Injectable()
export class DocxFormatter implements ReportFormatter {
  readonly format = "docx";

  async render(context: ReportContext): Promise<ReportResult> {
    const headerRow = new TableRow({
      children: context.columns.map(
        (c) =>
          new TableCell({
            children: [
              new Paragraph({
                text: c.header,
                heading: HeadingLevel.HEADING_3,
              }),
            ],
          })
      ),
    });

    const dataRows = context.rows.map(
      (row) =>
        new TableRow({
          children: context.columns.map(
            (c) =>
              new TableCell({
                children: [new Paragraph(String(row[c.key] ?? ""))],
              })
          ),
        })
    );

    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [headerRow, ...dataRows],
    });

    const document = new Document({
      sections: [
        {
          children: [
            new Paragraph({ text: context.title, heading: HeadingLevel.TITLE }),
            new Paragraph({
              text: `Generated: ${context.metadata.generatedAt}`,
            }),
            new Paragraph(" "),
            table,
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(document);

    return {
      buffer,
      fileName: `${context.fileName}.docx`,
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      metadata: context.metadata,
    };
  }
}
