//filepath: sae-backend/src/reports/mappers/base.mapper.ts
import { ReportContext } from "../core/report-context";

export interface BaseMapper<TPayload> {
  map(data: any): ReportContext;
}
