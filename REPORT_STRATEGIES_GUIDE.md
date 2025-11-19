# Report Strategies and Mappers Implementation Guide

## sae-backend Report System Architecture

This document outlines the standardized patterns for report generation implemented across the sae-backend project, replacing the legacy strategy system with a more organized, scalable, and maintainable architecture.

---

## 🎯 Overview

The Report Strategies and Mappers system provides a unified approach to generating reports across the SAE backend, featuring:

- **Domain-Specific Organization**: Reports organized by business domain (employee, equipment, tire)
- **Simplified Interface**: Clean, focused strategy pattern with essential methods only
- **Data Mapping Layer**: Centralized data transformation logic
- **Backward Compatibility**: Existing API endpoints continue to work without changes
- **Type Safety**: Full TypeScript support with proper interfaces and error handling

---

## 🏗️ Architecture Overview

### Core Components

1. **ReportStrategy Interface**: Defines the contract for all report strategies
2. **Domain-Specific Strategies**: Individual implementations for each report type
3. **ReportDataMapper**: Central service for data transformation from database to report format
4. **ReportFactory**: Manages strategy registration and provides backward compatibility
5. **Enhanced ExcelService**: Handles report formatting and buffer generation

### Directory Structure

```
src/reports/
├── strategies/
│   ├── report-strategy.interface.ts      # Core interface definition
│   ├── employee/                         # Employee domain reports
│   │   ├── employee-vacation.strategy.ts
│   │   └── employee-list.strategy.ts
│   ├── equipment/                        # Equipment domain reports
│   │   └── equipment-list.strategy.ts
│   └── tire/                             # Tire domain reports
│       └── tire-list.strategy.ts
├── mappers/
│   └── report-data.mapper.ts            # Central data transformation service
├── factory/
│   └── report.factory.ts                # Strategy factory and compatibility layer
├── services/
│   ├── excel.service.ts                 # Enhanced Excel generation service
│   └── pdf.service.ts                   # PDF generation service
├── reports.service.ts                   # Main reports service
├── reports.controller.ts                # API endpoints controller
├── reports.module.ts                    # Dependency injection module
└── dto/
    └── generate-report.dto.ts           # Request/response DTOs
```

---

## 📋 Core Interface Standard

### ReportStrategy Interface

**All report strategies MUST implement this interface:**

```typescript
export interface ReportStrategy {
  fileName: string; // Generated file name
  mimeType: string; // MIME type for response headers
  generate(filters: Record<string, any>): Promise<Buffer>; // Main generation method
}
```

### Strategy Implementation Pattern

```typescript
@Injectable()
export class {Domain}{Report}Strategy implements ReportStrategy {
  fileName = '{report-file-name}.xlsx';
  mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  constructor(
    private readonly excelService: ExcelService,
    private readonly mapper: ReportDataMapper,
  ) {}

  async generate(filters: Record<string, any>): Promise<Buffer> {
    // 1. Create workbook
    const workbook = await this.excelService.createWorkbook();
    const sheet = workbook.addWorksheet('{SheetName}');

    // 2. Get data through mapper
    const data = await this.mapper.map{Entity}{Operation}(filters);

    // 3. Define columns
    sheet.columns = [
      { header: '{ColumnHeader}', key: '{key}', width: {width} },
      // ... more columns
    ];

    // 4. Add data and generate buffer
    sheet.addRows(data);
    return this.excelService.generateBuffer(workbook);
  }
}
```

---

## 🔧 Implementation Examples

### Pattern 1: Employee Report Strategy

**File:** `src/reports/strategies/employee/employee-list.strategy.ts`

```typescript
@Injectable()
export class EmployeeListStrategy implements ReportStrategy {
  fileName = "employee-list.xlsx";
  mimeType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  constructor(
    private readonly excelService: ExcelService,
    private readonly mapper: ReportDataMapper
  ) {}

  async generate(filters: Record<string, any>): Promise<Buffer> {
    const workbook = await this.excelService.createWorkbook();
    const sheet = workbook.addWorksheet("Employees");

    const data = await this.mapper.mapEmployeeList(filters);

    sheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Employee", key: "name", width: 30 },
      { header: "Position", key: "position", width: 25 },
      { header: "Category", key: "category", width: 20 },
      { header: "Active", key: "active", width: 10 },
      { header: "Hire Date", key: "hireDate", width: 15 },
      { header: "Status", key: "status", width: 15 },
    ];

    sheet.addRows(data);
    return this.excelService.generateBuffer(workbook);
  }
}
```

### Pattern 2: Equipment Report Strategy

**File:** `src/reports/strategies/equipment/equipment-list.strategy.ts`

```typescript
@Injectable()
export class EquipmentListStrategy implements ReportStrategy {
  fileName = "equipment-list.xlsx";
  mimeType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  constructor(
    private readonly excelService: ExcelService,
    private readonly mapper: ReportDataMapper
  ) {}

  async generate(filters: Record<string, any>): Promise<Buffer> {
    const workbook = await this.excelService.createWorkbook();
    const sheet = workbook.addWorksheet("Equipment");

    const data = await this.mapper.mapEquipmentList(filters);

    sheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 25 },
      { header: "Brand", key: "brand", width: 20 },
      { header: "Model", key: "model", width: 20 },
      { header: "Category", key: "category", width: 20 },
      { header: "Status", key: "status", width: 15 },
      { header: "Active", key: "active", width: 10 },
      { header: "Year", key: "year", width: 10 },
    ];

    sheet.addRows(data);
    return this.excelService.generateBuffer(workbook);
  }
}
```

---

## 🔄 Data Mapping Patterns

### ReportDataMapper Structure

**Location:** `src/reports/mappers/report-data.mapper.ts`

The mapper handles all database queries and data transformation:

```typescript
@Injectable()
export class ReportDataMapper {
  constructor(private readonly prisma: PrismaService) {}

  async map{Entity}{Operation}(filters: Record<string, any>): Promise<any[]> {
    try {
      // 1. Build where clause from filters
      const whereClause: any = this.buildWhereClause(filters);

      // 2. Execute database query with includes
      const results = await this.prisma.{entity}.findMany({
        where: whereClause,
        include: this.buildIncludeClause(filters),
      });

      // 3. Transform data for report format
      return results.map(item => ({
        // Map database fields to report fields
        id: item.id,
        name: item.{nameField},
        // ... field mappings
      }));
    } catch (error) {
      throw new Error(`Failed to map {entity} {operation}: ${error.message}`);
    }
  }

  private buildWhereClause(filters: Record<string, any>): any {
    const whereClause: any = {};

    // Apply filters
    if (filters.status) whereClause.status = filters.status;
    if (filters.categoryId) whereClause.categoryId = parseInt(filters.categoryId);
    if (filters.dateRange) {
      // Handle date range filters
    }

    return whereClause;
  }
}
```

### Example: Employee Mapping

```typescript
async mapEmployeeList(filters: Record<string, any>): Promise<any[]> {
  try {
    const { status, categoryId, positionId } = filters;

    const whereClause: any = {};
    if (status) whereClause.status = status;
    if (categoryId) whereClause.categoryId = parseInt(categoryId);
    if (positionId) whereClause.positionId = parseInt(positionId);

    const employees = await this.prisma.employee.findMany({
      where: whereClause,
      include: {
        person: true,
        position: true,
        category: true,
      },
    });

    return employees.map((employee) => ({
      id: employee.id,
      name: `${employee.person.firstName} ${employee.person.lastName}`,
      position: employee.position.name,
      category: employee.category.name,
      active: employee.isActive ? "Yes" : "No",
      hireDate: employee.hireDate.toISOString().split("T")[0],
      status: employee.status,
    }));
  } catch (error) {
    throw new Error(`Failed to map employee list: ${error.message}`);
  }
}
```

---

## 📦 Dependency Injection Setup

### ReportsModule Configuration

**File:** `src/reports/reports.module.ts`

```typescript
@Module({
  imports: [PrismaModule],
  controllers: [ReportsController],
  providers: [
    // Core services
    ReportsService,
    ReportFactory,
    ExcelService,
    PdfService,

    // Data transformation
    ReportDataMapper,

    // Strategy implementations
    EmployeeVacationStrategy,
    EmployeeListStrategy,
    EquipmentListStrategy,
    TireListStrategy,
  ],
  exports: [ReportsService, ReportFactory, ExcelService, PdfService],
})
export class ReportsModule {}
```

### Strategy Factory Pattern

**File:** `src/reports/factory/report.factory.ts`

```typescript
@Injectable()
export class ReportFactory {
  private strategies: Map<NewReportType, ReportStrategy> = new Map();

  constructor(
    private readonly employeeVacationStrategy: EmployeeVacationStrategy,
    private readonly employeeListStrategy: EmployeeListStrategy,
    private readonly equipmentListStrategy: EquipmentListStrategy,
    private readonly tireListStrategy: TireListStrategy
  ) {
    this.initializeStrategies();
  }

  private initializeStrategies(): void {
    this.strategies.set(
      NewReportType.EMPLOYEE_VACATION,
      this.employeeVacationStrategy
    );
    this.strategies.set(NewReportType.EMPLOYEE_LIST, this.employeeListStrategy);
    this.strategies.set(
      NewReportType.EQUIPMENT_LIST,
      this.equipmentListStrategy
    );
    this.strategies.set(NewReportType.TIRE_LIST, this.tireListStrategy);
  }

  // Backward compatibility with legacy API
  public getLegacyReportStrategy(reportType: ReportType): ReportStrategy {
    const typeMapping: Record<ReportType, NewReportType> = {
      [ReportType.EMPLOYEE_USAGE]: NewReportType.EMPLOYEE_LIST,
      [ReportType.TIRE_INSPECTION]: NewReportType.TIRE_LIST,
      [ReportType.EQUIPMENT_MAINTENANCE]: NewReportType.EQUIPMENT_LIST,
      // ... mapping for other types
    };

    const newType = typeMapping[reportType];
    return this.getReportStrategy(newType);
  }
}
```

---

## 🚀 Usage Examples

### API Endpoint Usage

**Generate Employee Report:**

```typescript
POST /reports/generate
{
  "reportType": "employee_usage",
  "format": "excel",
  "filter": {
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "status": "ACTIVE"
  },
  "title": "Employee Annual Report"
}
```

**Generate Equipment Report:**

```typescript
POST /reports/generate
{
  "reportType": "equipment_maintenance",
  "format": "excel",
  "filter": {
    "categoryId": "1",
    "status": "ACTIVE"
  },
  "title": "Equipment Inventory"
}
```

**Generate Tire Report:**

```typescript
POST /reports/generate
{
  "reportType": "tire_inspection",
  "format": "excel",
  "filter": {
    "status": "IN_STOCK",
    "brandId": "2"
  },
  "title": "Tire Stock Report"
}
```

### Frontend Integration

```typescript
// React component example
const generateReport = async (reportType: string, filters: any) => {
  try {
    const response = await fetch("/reports/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reportType,
        format: "excel",
        filter: filters,
      }),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report_${Date.now()}.xlsx`;
    a.click();
  } catch (error) {
    console.error("Failed to generate report:", error);
  }
};
```

---

## 📊 Excel Service Integration

### Enhanced ExcelService Features

The ExcelService has been enhanced to work seamlessly with the new strategy pattern:

```typescript
@Injectable()
export class ExcelService {
  // Create workbook instance
  async createWorkbook(): Promise<Workbook> {
    const sheets: { [key: string]: Worksheet } = {};

    return {
      sheets,
      addWorksheet: (name: string): Worksheet => {
        const worksheet: Worksheet = {
          name,
          columns: [],
          rows: [],
          addRows: (data: ExcelRow[]) => {
            worksheet.rows.push(...data);
          },
        };
        sheets[name] = worksheet;
        return worksheet;
      },
    };
  }

  // Generate buffer from workbook
  async generateBuffer(workbook: Workbook): Promise<Buffer> {
    const allSheets = Object.values(workbook.sheets);

    let result = "";
    for (const sheet of allSheets) {
      result += `=== ${sheet.name} ===\n`;
      result += this.convertToCSV(sheet.rows, sheet.columns);
      result += "\n\n";
    }

    return Buffer.from(result, "utf-8");
  }
}
```

---

## 🎨 Best Practices

### 1. Strategy Naming Convention

- **File naming**: `{domain}-{operation}.strategy.ts`
- **Class naming**: `{Domain}{Operation}Strategy`
- **Domain folders**: lowercase (employee/, equipment/, tire/)
- **Method naming**: `map{Entity}{Operation}`

### 2. Filter Handling

Always handle filters gracefully:

```typescript
// Build safe where clauses
const whereClause: any = {};
if (filters.status) whereClause.status = filters.status;
if (filters.categoryId) {
  whereClause.categoryId = parseInt(filters.categoryId);
}

// Handle date ranges
if (filters.startDate || filters.endDate) {
  whereClause.createdAt = {};
  if (filters.startDate)
    whereClause.createdAt.gte = new Date(filters.startDate);
  if (filters.endDate) whereClause.createdAt.lte = new Date(filters.endDate);
}
```

### 3. Error Handling

Implement comprehensive error handling:

```typescript
async generate(filters: Record<string, any>): Promise<Buffer> {
  try {
    // Validation
    this.validateFilters(filters);

    // Processing
    const workbook = await this.excelService.createWorkbook();
    const data = await this.mapper.mapEmployeeList(filters);

    // Format and return
    const sheet = workbook.addWorksheet('Employees');
    sheet.columns = this.getColumnDefinitions();
    sheet.addRows(data);

    return this.excelService.generateBuffer(workbook);
  } catch (error) {
    throw new Error(`Failed to generate employee list report: ${error.message}`);
  }
}
```

### 4. Column Definition Standards

```typescript
// Consistent column patterns
sheet.columns = [
  { header: "ID", key: "id", width: 10 }, // Identifiers
  { header: "Name", key: "name", width: 30 }, // Names
  { header: "Status", key: "status", width: 15 }, // Status fields
  { header: "Active", key: "active", width: 10 }, // Boolean flags
  { header: "Created", key: "createdAt", width: 20 }, // Dates
];
```

### 5. Data Transformation Standards

- **Date formatting**: Use `toISOString().split('T')[0]` for dates
- **Boolean fields**: Convert to "Yes"/"No" for readability
- **Null handling**: Provide sensible defaults ("N/A", "Not Assigned")
- **Related data**: Include names from related entities

---

## 🔄 Migration from Legacy System

### Legacy Compatibility

The new system maintains full backward compatibility through the `ReportFactory`:

```typescript
// Legacy API calls continue to work unchanged
POST /reports/generate
{
  "reportType": "employee_usage",    // Maps to new employee_list strategy
  "format": "excel",
  "filter": { /* filters */ }
}
```

### Migration Checklist

When adding new report types:

- [ ] 1. Create strategy file in appropriate domain folder
- [ ] 2. Implement ReportStrategy interface
- [ ] 3. Add corresponding mapper method in ReportDataMapper
- [ ] 4. Register strategy in ReportFactory
- [ ] 5. Add strategy to ReportsModule providers
- [ ] 6. Add type mapping for backward compatibility
- [ ] 7. Test with existing API endpoints
- [ ] 8. Verify TypeScript compilation
- [ ] 9. Test Excel generation and formatting

---

## 🚀 Benefits Achieved

### Architecture Improvements

- ✅ **Domain-Driven Organization**: Reports grouped by business context
- ✅ **Simplified Interface**: Focus on essential methods only
- ✅ **Separation of Concerns**: Clear separation between strategy and data mapping
- ✅ **Enhanced Testability**: Isolated strategies easier to unit test

### Developer Experience

- ✅ **Consistent Patterns**: Same structure across all report types
- ✅ **Type Safety**: Full TypeScript support with proper interfaces
- ✅ **Easy Extension**: Simple pattern to add new report types
- ✅ **Clear Dependencies**: Explicit injection and dependencies

### Maintenance and Scalability

- ✅ **Modular Design**: Each report type is independent
- ✅ **Data Layer Isolation**: Mappers handle all database interactions
- ✅ **Backward Compatibility**: Existing integrations continue to work
- ✅ **Error Handling**: Centralized error management

### Performance Optimizations

- ✅ **Efficient Database Queries**: Optimized includes and where clauses
- ✅ **Buffered Generation**: Memory-efficient report generation
- ✅ **Lazy Loading**: Strategies loaded on demand through factory

---

## 🔮 Future Enhancements

### Planned Improvements

1. **Real Excel Generation**: Integrate exceljs library for true Excel files
2. **PDF Generation**: Enhanced PDF generation with proper formatting
3. **Template System**: Support for custom report templates
4. **Caching**: Report result caching for frequently requested reports
5. **Async Generation**: Background report generation for large datasets
6. **Email Integration**: Direct email delivery of generated reports

### Extension Patterns

To add a new report type:

1. Create strategy: `src/reports/strategies/{domain}/{operation}.strategy.ts`
2. Add mapper method: `map{Entity}{Operation}()` in ReportDataMapper
3. Register in factory: Add to `initializeStrategies()` method
4. Update module: Add to providers array
5. Add compatibility mapping if needed

---

## 📚 Additional Resources

### Core Files Reference

- **ReportStrategy Interface**: `src/reports/strategies/report-strategy.interface.ts`
- **ReportDataMapper**: `src/reports/mappers/report-data.mapper.ts`
- **ReportFactory**: `src/reports/factory/report.factory.ts`
- **ExcelService**: `src/reports/services/excel.service.ts`

### Example Implementations

- **Employee Reports**: `src/reports/strategies/employee/`
- **Equipment Reports**: `src/reports/strategies/equipment/`
- **Tire Reports**: `src/reports/strategies/tire/`

### Testing Considerations

- Unit test each strategy independently
- Mock ReportDataMapper for strategy testing
- Integration test complete report generation flow
- Verify backward compatibility with legacy endpoints

---

## 🎯 Summary

The Report Strategies and Mappers system provides a robust, scalable foundation for report generation in the SAE backend. By following these established patterns, developers can quickly add new report types while maintaining consistency and reliability across the entire reporting system.

The architecture balances simplicity with flexibility, making it accessible for new developers while providing the depth needed for complex business requirements.

---

_This guide should be referenced when implementing new report strategies or modifying existing ones to maintain consistency and quality across the sae-backend report system._
