# DTO Standardization Guide

## sae-backend API Consistency Standards

This document outlines the standardized patterns for query and response DTOs implemented across the sae-backend project.

---

## 🎯 Overview

The DTO standardization initiative ensures consistent API patterns across all modules, providing:

- **Unified Query Interface**: All list endpoints use the same pagination, search, and sorting parameters
- **Predictable Response Format**: Consistent structure with data and meta information
- **Enhanced Maintainability**: Reduced code duplication and simplified patterns
- **Better Frontend Integration**: Predictable API contracts

---

## 📋 Standards Overview

### Query DTO Standard

**All list endpoints MUST use one of these patterns:**

1. **Direct BaseQueryDto Usage**: For simple modules without additional filters

   ```typescript
   @Get()
   findAll(@Query() query: BaseQueryDto) {
     return this.service.findAll(query);
   }
   ```

2. **Extended BaseQueryDto**: For modules requiring additional filters
   ```typescript
   // Example: Employee Incidents
   export class EmployeeIncidentsQueryDto extends BaseQueryDto {
     @ApiPropertyOptional({ description: "Filter by employee ID" })
     @IsOptional()
     @Type(() => Number)
     @IsNumber()
     employeeId?: number;
   }
   ```

### Response DTO Standard

**All list endpoints MUST return BaseResponseDto:**

```typescript
// Service Implementation
async findAll(
  query: BaseQueryDto = new BaseQueryDto()
): Promise<BaseResponseDto<any>> {
  const { skip, take, q, sortBy = "name", sortOrder = "asc" } = query;

  // Build search filter
  const where: any = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  // Execute query with transaction
  const [data, total] = await this.prisma.$transaction([
    this.prisma.module.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: sortOrder },
    }),
    this.prisma.module.count({ where }),
  ]);

  return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
}
```

---

## 🔧 Implementation Examples

### Pattern 1: Simple Module (Direct BaseQueryDto)

**Controller:**

```typescript
@Controller("provinces")
export class ProvincesController {
  @Get()
  findAll(@Query() query: BaseQueryDto) {
    return this.provincesService.findAll(query);
  }
}
```

**Service:**

```typescript
@Injectable()
export class ProvincesService {
  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "name", sortOrder = "asc" } = query;

    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { code: { contains: q, mode: "insensitive" } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.province.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
        include: { country: true, cities: true },
      }),
      this.prisma.province.count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }
}
```

### Pattern 2: Extended Query DTO (Module-Specific Filters)

**Custom Query DTO:**

```typescript
export class TireInspectionsQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    description: "Filter by tire ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  tireId?: number;

  @ApiPropertyOptional({
    description: "Filter by equipment ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  equipmentId?: number;

  @ApiPropertyOptional({
    description: "Filter by inspection date from",
    example: "2024-01-01T00:00:00Z",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fromDate?: Date;

  @ApiPropertyOptional({
    description: "Minimum pressure for filtering",
    example: 30.0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPressure?: number;
}
```

**Controller:**

```typescript
@Controller("tire-inspections")
export class TireInspectionsController {
  @Get()
  findAll(@Query() query: TireInspectionsQueryDto) {
    return this.service.findAll(query);
  }
}
```

**Service:**

```typescript
async findAll(
  query: TireInspectionsQueryDto = new TireInspectionsQueryDto()
): Promise<BaseResponseDto<any>> {
  const { skip, take, q, sortBy = "inspectionDate", sortOrder = "desc" } = query;

  const where: any = {};
  if (query.tireId) where.tireId = query.tireId;
  if (query.equipmentId) {
    where.tire = {
      assignments: {
        some: {
          positionConfig: {
            axle: { equipmentId: query.equipmentId },
          },
        },
      },
    };
  }

  if (query.minPressure) {
    where.pressure = { gte: query.minPressure };
  }

  if (q) {
    where.OR = [
      { observation: { contains: q, mode: "insensitive" } },
      { tire: { serialNumber: { contains: q, mode: "insensitive" } } },
    ];
  }

  const [data, total] = await this.prisma.$transaction([
    this.prisma.tireInspection.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: sortOrder },
      include: { tire: { include: { model: { include: { brand: true } } } } },
    }),
    this.prisma.tireInspection.count({ where }),
  ]);

  return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
}
```

---

## 📊 Standard Query Parameters

All list endpoints support these parameters:

| Parameter   | Type   | Required | Default         | Description                     |
| ----------- | ------ | -------- | --------------- | ------------------------------- |
| `page`      | number | No       | 1               | Page number (1-based)           |
| `limit`     | number | No       | 10              | Items per page (max 100)        |
| `q`         | string | No       | -               | Search query for text fields    |
| `sortBy`    | string | No       | module-specific | Field to sort by                |
| `sortOrder` | string | No       | "asc"           | Sort direction: "asc" or "desc" |

---

## 📦 Standard Response Format

All list endpoints return this structure:

```typescript
{
  "data": [
    // Array of items
  ],
  "meta": {
    "total": 125,        // Total number of items
    "page": 1,           // Current page
    "limit": 20,         // Items per page
    "totalPages": 7      // Total number of pages
  }
}
```

Single item endpoints return:

```typescript
{
  "data": {
    // Single item object
  }
}
```

---

## 🏗️ File Structure Standards

### Query DTO Location

- **Simple modules**: Use `BaseQueryDto` directly in controller
- **Complex modules**: Create `*-query.dto.ts` in the module's `dto/` folder
- **Naming**: `{ModuleName}QueryDto` extending `BaseQueryDto`

### Examples:

```
src/modules/employees/dto/employee-incidents-query.dto.ts
src/modules/tires/tire-inspections/dto/tire-inspections-query.dto.ts
src/modules/tires/tire-events/dto/tire-events-query.dto.ts
```

---

## 🎨 Best Practices

### 1. Always Use Transactions

```typescript
const [data, total] = await this.prisma.$transaction([
  this.prisma.module.findMany({
    /* query */
  }),
  this.prisma.module.count({ where }),
]);
```

### 2. Default Sort Values

- **Alphabetical data**: `sortBy: "name", sortOrder: "asc"`
- **Temporal data**: `sortBy: "createdAt", sortOrder: "desc"`
- **Business-specific**: Choose the most logical default

### 3. Search Field Selection

Choose fields that make sense for discovery:

- **Names and descriptions**: Always include
- **Codes and identifiers**: When relevant
- **Related entity names**: For complex relationships

### 4. Filter Validation

Always validate additional filter parameters:

```typescript
if (query.minPressure !== undefined) {
  where.pressure = { gte: query.minPressure };
}
```

### 5. Include Patterns

Include related entities that add value:

- **One-to-one**: Usually include
- **One-to-many**: Consider pagination impact
- **Many-to-many**: Include selectively

---

## 🔄 Migration Checklist

When implementing these standards for a new module:

- [ ] 1. Create or identify query DTO pattern needed
- [ ] 2. Implement service with proper transaction pattern
- [ ] 3. Return `BaseResponseDto` from service
- [ ] 4. Update controller to use standardized DTO
- [ ] 5. Test with various query parameters
- [ ] 6. Verify Swagger documentation generation
- [ ] 7. Update frontend API client accordingly

---

## 🚀 Benefits Achieved

### Developer Experience

- ✅ **Consistent patterns** across all modules
- ✅ **Predictable API behavior** for all list endpoints
- ✅ **Simplified debugging** with uniform error handling
- ✅ **Faster development** with established patterns

### Code Quality

- ✅ **Eliminated code duplication** in pagination logic
- ✅ **Standardized error handling** patterns
- ✅ **Improved type safety** with consistent DTOs
- ✅ **Better maintainability** with unified approach

### Frontend Integration

- ✅ **Simplified API client** with consistent response format
- ✅ **Predictable pagination** behavior across all endpoints
- ✅ **Unified search and filtering** patterns
- ✅ **Reduced parsing logic** in frontend applications

---

## 📚 Additional Resources

### Base Classes

- `BaseQueryDto`: Located in `src/common/dto/base-query.dto.ts`
- `BaseResponseDto`: Located in `src/common/dto/base-query.dto.ts`

### Example Implementations

- **Simple**: Cities, Provinces, Countries modules
- **Complex**: Tire Inspections, Employee Incidents, Tire Events

### Testing Considerations

- Update unit tests to pass `BaseQueryDto` instances
- Mock Prisma client with proper `count()` method
- Verify response format includes both `data` and `meta`

---

_This guide should be referenced when implementing new modules or updating existing ones to maintain consistency across the sae-backend API._
