//fliepath: sae-backend/src/tires/tire-reports/exports/excel/tire-reports.exporter.ts
import * as ExcelJS from "exceljs";
import { Response } from "express";

export class TireReportsExcelExporter {
  // 🧩 Export: Vida útil promedio
  static async exportAverageLife(res: Response, data: any) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Vida útil promedio");

    sheet.columns = [
      { header: "ID Neumático", key: "tireId", width: 15 },
      { header: "Kilómetros recorridos", key: "km", width: 20 },
    ];

    sheet.addRows(data.report);
    sheet.addRow([]);
    sheet.addRow(["Promedio (km)", data.averageKm]);

    await TireReportsExcelExporter.finalize(
      res,
      workbook,
      "vida_util_promedio.xlsx"
    );
  }

  // 🧩 Export: Ranking de marcas
  static async exportBrandRanking(res: Response, data: any) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Ranking marcas");

    sheet.columns = [
      { header: "Marca", key: "brand", width: 25 },
      { header: "Promedio (km)", key: "avgKm", width: 20 },
    ];

    sheet.addRows(data);

    await TireReportsExcelExporter.finalize(
      res,
      workbook,
      "ranking_marcas.xlsx"
    );
  }

  // 🧩 Export: Costo por km
  static async exportCostPerKm(res: Response, data: any) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Costo por KM");

    sheet.columns = [
      { header: "ID Neumático", key: "tireId", width: 15 },
      { header: "Marca ID", key: "brand", width: 15 },
      { header: "Costo Total", key: "totalCost", width: 15 },
      { header: "KM Totales", key: "km", width: 15 },
      { header: "Costo por KM", key: "costPerKm", width: 15 },
    ];

    sheet.addRows(data);

    await TireReportsExcelExporter.finalize(res, workbook, "costo_por_km.xlsx");
  }

  // 🧩 Export: Reporte anual recapados
  static async exportYearlyRecaps(res: Response, data: any) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(`Recapados ${data.year}`);

    sheet.columns = [
      { header: "Marca", key: "brand", width: 20 },
      { header: "Costo Total ($)", key: "cost", width: 20 },
    ];

    const rows = Object.entries(data.costByBrand).map(([brand, cost]) => ({
      brand,
      cost,
    }));

    sheet.addRows(rows);
    sheet.addRow([]);
    sheet.addRow(["Total recapados", data.totalRecaps]);
    sheet.addRow(["Costo total", data.totalCost]);

    await TireReportsExcelExporter.finalize(
      res,
      workbook,
      `recapados_${data.year}.xlsx`
    );
  }

  // 🔧 Finalización común (envía archivo Excel)
  private static async finalize(
    res: Response,
    workbook: ExcelJS.Workbook,
    filename: string
  ) {
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    await workbook.xlsx.write(res);
    res.end();
  }
}
