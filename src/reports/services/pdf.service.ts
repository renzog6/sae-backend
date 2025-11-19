// filepath: src/reports/services/pdf.service.ts
import { Injectable, Logger } from "@nestjs/common";

export interface PdfConfig {
  orientation?: "portrait" | "landscape";
  format?: "A4" | "A3" | "Letter" | "Legal";
  margins?: { top: number; right: number; bottom: number; left: number };
  fontSize?: number;
  titleFontSize?: number;
  headerFontSize?: number;
  lineHeight?: number;
  title?: string;
  includeHeader?: boolean;
  includeFooter?: boolean;
  showPageNumbers?: boolean;
}

/**
 * PdfService
 *
 * - Primary path: if `puppeteer` is installed, uses it to render HTML -> PDF (Buffer)
 * - Fallback path: returns an informative Buffer containing HTML/text placeholder.
 *
 * NOTE: To enable real PDF generation install puppeteer:
 *   npm i -S puppeteer
 */
@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  /** Generate a PDF Buffer from report data or HTML template */
  async generatePdf(
    data: any,
    fileName = "report.pdf",
    config: PdfConfig = {}
  ): Promise<Buffer> {
    // If the strategy provided raw data, transform to HTML first
    const html = this.createHtmlReport(data, config.title || fileName, config);

    // Try to use puppeteer if installed
    try {
      // dynamic import to avoid hard dependency
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const puppeteer = require("puppeteer");

      // Launch browser and generate PDF
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      const pdfBuffer = await page.pdf({
        format: config.format || "A4",
        printBackground: true,
        landscape: config.orientation === "landscape",
        margin: config.margins || undefined,
      });
      await browser.close();
      return pdfBuffer;
    } catch (err: any) {
      // Puppeteer not available or failed — fallback
      this.logger.warn(
        "Puppeteer not available or failed. Returning HTML placeholder buffer.",
        err?.message ?? err
      );
      const header = "%PDF-PLACEHOLDER-1.0\n";
      return Buffer.from(header + html, "utf-8");
    }
  }

  /**
   * Create an HTML representation of report data.
   * Keep minimal CSS to make the PDF look decent when rendered.
   */
  createHtmlReport(
    data: any,
    title = "Report",
    config: PdfConfig = {}
  ): string {
    const now = new Date().toISOString();
    const body = this.formatDataAsHtml(data);

    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${this.escapeHtml(title)}</title>
    <style>
      body { font-family: Arial, sans-serif; font-size: ${config.fontSize || 12}px; margin: 20px; color: #222; }
      h1 { font-size: ${config.titleFontSize || 18}px; margin-bottom: 6px; }
      .meta { font-size: 11px; color: #666; margin-bottom: 12px; }
      table { width:100%; border-collapse: collapse; margin-top: 12px; }
      th, td { border:1px solid #ddd; padding:8px; text-align:left; }
      th { background:#f4f4f4; }
      pre { white-space: pre-wrap; font-family: inherit; }
    </style>
  </head>
  <body>
    <h1>${this.escapeHtml(title)}</h1>
    <div class="meta">Generated at: ${now}</div>
    ${body}
  </body>
</html>`;
  }

  private formatDataAsHtml(data: any): string {
    if (!data) return "<p>No data</p>";

    if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
      const keys = Array.from(
        new Set(data.flatMap((d: any) => (d ? Object.keys(d) : [])))
      );
      const headerRow = keys
        .map((k) => `<th>${this.escapeHtml(this.humanize(k))}</th>`)
        .join("");
      const bodyRows = data
        .map((row: any) => {
          const cols = keys
            .map(
              (k) => `<td>${this.escapeHtml(this.cellToString(row?.[k]))}</td>`
            )
            .join("");
          return `<tr>${cols}</tr>`;
        })
        .join("");
      return `<table><thead><tr>${headerRow}</tr></thead><tbody>${bodyRows}</tbody></table>`;
    }

    if (typeof data === "object") {
      const rows = Object.entries(data)
        .map(
          ([k, v]) =>
            `<div><strong>${this.escapeHtml(this.humanize(k))}:</strong> ${this.escapeHtml(this.cellToString(v))}</div>`
        )
        .join("");
      return `<div>${rows}</div>`;
    }

    return `<div>${this.escapeHtml(String(data))}</div>`;
  }

  private cellToString(value: any): string {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  }

  private humanize(key: string): string {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/^./, (s) => s.toUpperCase())
      .trim();
  }

  private escapeHtml(text: string): string {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
