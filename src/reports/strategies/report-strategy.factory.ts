// filepath: sae-backend/src/reports/strategies/report-strategy.factory.ts
import { Injectable } from "@nestjs/common";
import { ReportType } from "../core/report-type.enum";
import { ReportStrategy } from "./report-strategy.interface";

// import strategies:
import { EmployeeListStrategy } from "./employee/employee-list.strategy";
import { EmployeeVacationBalanceStrategy } from "./employee/employee-vacation-balance.strategy";
import { EmployeeVacationHistoryStrategy } from "./employee/employee-vacation-history.strategy";
import { EquipmentListStrategy } from "./equipment/equipment-list.strategy";
import { TireListStrategy } from "./tire/tire-list.strategy";

@Injectable()
export class ReportStrategyFactory {
  private readonly strategies: Map<ReportType, ReportStrategy>;

  constructor(
    private readonly employeeList: EmployeeListStrategy,
    private readonly employeeVacationBalance: EmployeeVacationBalanceStrategy,
    private readonly employeeVacationHistory: EmployeeVacationHistoryStrategy,
    private readonly equipmentList: EquipmentListStrategy,
    private readonly tireList: TireListStrategy
  ) {
    this.strategies = new Map<ReportType, ReportStrategy>([
      [ReportType.EMPLOYEE_LIST, this.employeeList],
      [ReportType.EMPLOYEE_VACATION_BALANCE, this.employeeVacationBalance],
      [ReportType.EMPLOYEE_VACATION_HISTORY, this.employeeVacationHistory],
      [ReportType.EQUIPMENT_LIST, this.equipmentList],
      [ReportType.TIRE_LIST, this.tireList],
    ]);
  }

  getStrategy(type: ReportType): ReportStrategy {
    const strategy = this.strategies.get(type);
    if (!strategy) {
      throw new Error(`No report strategy registered for type ${type}`);
    }
    return strategy;
  }
}
