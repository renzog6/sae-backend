// filepath: sae-backend/src/reports/mappers.providers.ts

import { EmployeeListMapper } from "./mappers/employee/employee-list.mapper";
import { EmployeeVacationBalanceMapper } from "./mappers/employee/employee-vacation-balance.mapper";
import { EmployeeVacationHistoryMapper } from "./mappers/employee/employee-vacation-history.mapper";
import { EquipmentListMapper } from "./mappers/equipment/equipment-list.mapper";
import { TireListMapper } from "./mappers/tire/tire-list.mapper";

export const MapperProviders = [
  EmployeeListMapper,
  EmployeeVacationBalanceMapper,
  EmployeeVacationHistoryMapper,
  EquipmentListMapper,
  TireListMapper,
];
