// filepath: sae-backend/src/reports/mappers/report-data.mapper.ts
import { Injectable } from "@nestjs/common";
import { ReportType } from "@reports/core/report-type.enum";
import { EmployeeListMapper } from "./employee/employee-list.mapper";
import { EmployeeVacationMapper } from "./employee/employee-vacation.mapper";
import { EquipmentListMapper } from "./equipment/equipment-list.mapper";
import { TireListMapper } from "./tire/tire-list.mapper";

@Injectable()
export class ReportDataMapper {
  constructor(
    private readonly employeeListMapper: EmployeeListMapper,
    private readonly employeeVacationMapper: EmployeeVacationMapper,
    private readonly equipmentListMapper: EquipmentListMapper,
    private readonly tireListMapper: TireListMapper
  ) {}

  map(type: ReportType, filters: any) {
    switch (type) {
      case "employee_list":
        return this.employeeListMapper.map(filters);
      case "employee_vacation":
        return this.employeeVacationMapper.map(filters);
      case "equipment_list":
        return this.equipmentListMapper.map(filters);
      case "tire_list":
        return this.tireListMapper.map(filters);
      default:
        throw new Error("Unknown report type");
    }
  }
}
