/**
 * Factory class for creating report strategies based on ReportType.
 * This factory automatically registers and provides all available report strategies.
 */
import { Injectable, NotFoundException } from "@nestjs/common";
import { ReportType } from "@common/enums/report-type.enum";
import { ReportStrategy } from "@reports/strategies/report-strategy.interface";

// Import all strategy implementations
import { EmployeeListStrategy } from "@reports/strategies/employee/employee-list.strategy";
import { EmployeeVacationStrategy } from "@reports/strategies/employee/employee-vacation.strategy";
import { EquipmentListStrategy } from "@reports/strategies/equipment/equipment-list.strategy";
import { TireListStrategy } from "@reports/strategies/tire/tire-list.strategy";

@Injectable()
export class ReportFactory {
  constructor(
    private readonly employeeList: EmployeeListStrategy,
    private readonly employeeVacation: EmployeeVacationStrategy,
    private readonly equipmentList: EquipmentListStrategy,
    private readonly tireList: TireListStrategy
  ) {}

  /**
   * Retrieves the appropriate report strategy based on the report type.
   * @param type The type of report to generate
   * @returns The corresponding ReportStrategy implementation
   * @throws NotFoundException if the report type is not supported
   */
  getStrategy(type: ReportType): ReportStrategy {
    switch (type) {
      case ReportType.EMPLOYEE_LIST:
        return this.employeeList;
      case ReportType.EMPLOYEE_VACATION:
        return this.employeeVacation;
      case ReportType.EQUIPMENT_LIST:
        return this.equipmentList;
      case ReportType.TIRE_LIST:
        return this.tireList;
      default:
        throw new NotFoundException(
          `Unsupported report type: ${type}. Supported types: ${this.getAvailableReportTypes().join(", ")}`
        );
    }
  }

  /**
   * Returns all available report types that can be generated.
   * @returns Array of supported ReportType values
   */
  getAvailableReportTypes(): ReportType[] {
    return [
      ReportType.EMPLOYEE_LIST,
      ReportType.EMPLOYEE_VACATION,
      ReportType.EQUIPMENT_LIST,
      ReportType.TIRE_LIST,
    ];
  }
}
