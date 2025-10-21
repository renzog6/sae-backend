//filepath: sae-backend/src/tires/tire-reports/tire-reports.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { TireReportFilterDto } from "./dto/tire-report-filter.dto";

@Injectable()
export class TireReportsService {
  constructor(private prisma: PrismaService) {}

  // 📊 1. Vida útil promedio
  async getAverageLifeKm(filter: TireReportFilterDto) {
    const tires = await this.prisma.tire.findMany({
      where: {
        model: filter.brand
          ? { brand: { name: { contains: filter.brand } } }
          : undefined,
      },
      include: {
        assignments: {
          include: {
            positionConfig: {
              include: { axle: { include: { equipment: true } } },
            },
          },
        },
        events: true,
      },
    });

    const report = tires.map((t) => {
      // Calcular km totales desde assignments
      const totalKm = t.assignments.reduce((sum, a) => {
        const kmStart = a.kmAtStart ?? 0;
        const kmEnd = a.kmAtEnd ?? kmStart;
        return sum + (kmEnd - kmStart);
      }, 0);

      return { tireId: t.id, km: totalKm };
    });

    const avgKm =
      report.reduce((sum, r) => sum + (r.km || 0), 0) / (report.length || 1);

    return { count: report.length, averageKm: avgKm };
  }

  // 💰 2. Costo total por km (compra + recapados)
  async getCostPerKm(filter: TireReportFilterDto) {
    const tires = await this.prisma.tire.findMany({
      where: {
        model: filter.brand
          ? { brand: { name: { contains: filter.brand } } }
          : undefined,
      },
      include: {
        recaps: true,
        assignments: true, // Para calcular km desde assignments
        model: { include: { brand: true } },
      },
    });

    return tires.map((t) => {
      const recapCost = t.recaps.reduce(
        (sum, r) => sum + Number(r.cost ?? 0),
        0
      );
      const totalCost = recapCost; // Sin purchaseCost por ahora

      // Calcular km totales desde assignments
      const km = t.assignments.reduce((sum, a) => {
        const kmStart = a.kmAtStart ?? 0;
        const kmEnd = a.kmAtEnd ?? kmStart;
        return sum + (kmEnd - kmStart);
      }, 0);

      return {
        tireId: t.id,
        brand: t.model?.brand?.name || "Sin marca",
        totalCost,
        km,
        costPerKm: km > 0 ? totalCost / km : null,
      };
    });
  }

  // 🔁 3. Neumáticos recapados más de N veces
  async getOverRecapped(threshold = 2) {
    const tires = await this.prisma.tire.findMany({
      include: { recaps: true },
    });

    return tires
      .filter((t) => t.recaps.length > threshold)
      .map((t) => ({
        tireId: t.id,
        recapCount: t.recaps.length,
      }));
  }

  // 🏆 4. Ranking de marcas por duración promedio
  async getBrandRanking() {
    const tires = await this.prisma.tire.findMany({
      include: {
        assignments: true, // Para calcular km desde assignments
        model: { include: { brand: true } },
      },
    });

    const grouped = new Map<string, { totalKm: number; count: number }>();

    for (const t of tires) {
      // Calcular km totales desde assignments en lugar de totalKm
      const totalKm = t.assignments.reduce((sum, a) => {
        const kmStart = a.kmAtStart ?? 0;
        const kmEnd = a.kmAtEnd ?? kmStart;
        return sum + (kmEnd - kmStart);
      }, 0);

      const brand = t.model?.brand?.name ?? "Desconocida";

      if (!grouped.has(brand)) grouped.set(brand, { totalKm: 0, count: 0 });
      const data = grouped.get(brand)!;
      data.totalKm += totalKm;
      data.count += 1;
    }

    return [...grouped.entries()]
      .map(([brand, { totalKm, count }]) => ({
        brand,
        avgKm: totalKm / (count || 1),
      }))
      .sort((a, b) => b.avgKm - a.avgKm);
  }

  // 🗓️ 5. Reporte anual de recapados
  async getYearlyRecapReport(year: number) {
    const recaps = await this.prisma.tireRecap.findMany({
      where: {
        recapDate: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`),
        },
      },
      include: { tire: { include: { model: { include: { brand: true } } } } },
    });

    const totalCost = recaps.reduce((sum, r) => sum + Number(r.cost ?? 0), 0);
    const byBrand = new Map<string, number>();

    for (const r of recaps) {
      const brand = r.tire?.model?.brand?.name ?? "Desconocida";
      byBrand.set(brand, (byBrand.get(brand) ?? 0) + Number(r.cost ?? 0));
    }

    return {
      year,
      totalRecaps: recaps.length,
      totalCost,
      costByBrand: Object.fromEntries(byBrand),
    };
  }
}
