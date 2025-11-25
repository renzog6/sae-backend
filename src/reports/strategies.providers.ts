// filepath: sae-backend/src/reports/strategies.providers.ts

import { EmployeeListStrategy } from "./strategies/employee/employee-list.strategy";
import { EmployeeVacationBalanceStrategy } from "./strategies/employee/employee-vacation-balance.strategy";
import { EmployeeVacationHistoryStrategy } from "./strategies/employee/employee-vacation-history.strategy";
import { EquipmentListStrategy } from "./strategies/equipment/equipment-list.strategy";
import { TireListStrategy } from "./strategies/tire/tire-list.strategy";

export const StrategyProviders = [
  EmployeeListStrategy,
  EmployeeVacationBalanceStrategy,
  EmployeeVacationHistoryStrategy,
  EquipmentListStrategy,
  TireListStrategy,
];
