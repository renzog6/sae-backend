// filepath: sae-backend/src/reports/formatters/xlsx.formatter.ts

import { Injectable } from "@nestjs/common";
import { ReportFormatter } from "./report-formatter.interface";
import { ReportContext } from "../core/report-context";
import { ReportResult } from "../core/report-result";
import * as ExcelJS from "exceljs";

@Injectable()
export class XLSXFormatter implements ReportFormatter {
  readonly format = "xlsx";

  async render(context: ReportContext): Promise<ReportResult> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(context.title ?? "Report");

    //----------------------------------------------------------------------
    // 1. DEFINIR COLUMNAS
    //----------------------------------------------------------------------
    sheet.columns = context.columns.map((col) => ({
      header: col.header,
      key: col.key,
      width: col.width ?? 20,
    }));

    //----------------------------------------------------------------------
    // 2. ESTILAR ENCABEZADOS
    //----------------------------------------------------------------------
    context.columns.forEach((col, index) => {
      const cell = sheet.getRow(1).getCell(index + 1);

      const style = resolveColumnStyle(col, context.styles);

      if (style.header?.bold) {
        cell.font = { bold: true };
      }

      if (style.header?.alignment) {
        cell.alignment = { horizontal: style.header.alignment };
      }
    });

    //----------------------------------------------------------------------
    // 3. AGREGAR FILAS CON TIPOS Y FORMATOS
    //----------------------------------------------------------------------
    context.rows.forEach((row) => {
      const rowData: any = {};

      context.columns.forEach((col) => {
        const rawValue = row[col.key];

        //------------------------------------------------------------
        // Conversión automática según tipo declarado
        //------------------------------------------------------------
        switch (col.type) {
          case "number":
            rowData[col.key] = Number(rawValue) || 0;
            break;

          case "date":
            rowData[col.key] = rawValue ? new Date(rawValue) : null;
            break;

          case "string":
          default:
            rowData[col.key] = rawValue != null ? String(rawValue) : "";
            break;
        }
      });

      const excelRow = sheet.addRow(rowData);

      //------------------------------------------------------------
      // Aplicar formatos y estilos después de agregar la fila
      //------------------------------------------------------------
      context.columns.forEach((col, colIndex) => {
        const cell = excelRow.getCell(colIndex + 1);

        if (col.format) {
          cell.numFmt = col.format;
        }

        const style = resolveColumnStyle(col, context.styles);

        if (style.data?.alignment) {
          cell.alignment = { horizontal: style.data.alignment };
        }
      });
    });

    //----------------------------------------------------------------------
    // 4. Generar buffer final Excel
    //----------------------------------------------------------------------
    const raw = await workbook.xlsx.writeBuffer();

    return {
      buffer: Buffer.from(raw),
      fileName: `${context.metadata?.fileName ?? "report"}.xlsx`,
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      metadata: context.metadata ?? {},
    };
  }
}

function resolveColumnStyle(
  col: any,
  defaults?: {
    header?: { bold?: boolean; alignment?: "left" | "center" | "right" };
    data?: { alignment?: "left" | "center" | "right" };
  }
) {
  return {
    header: {
      ...defaults?.header,
      ...col.style?.header,
    },
    data: {
      ...defaults?.data,
      ...col.style?.data,
    },
  };
}
