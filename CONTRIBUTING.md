# Guía de Desarrollo - SAE Backend

## Arquitectura de Módulos

### Patrón BaseService

La mayoría de los servicios deben extender `BaseService<T>` para mantener consistencia y reducir código duplicado.

#### Servicios que Extienden BaseService

```typescript
// ✅ RECOMENDADO para servicios CRUD simples
@Injectable()
export class MyService extends BaseService<MyModel> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.myModel;
  }

  protected buildSearchConditions(q: string) {
    return [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  // Solo métodos personalizados si es necesario
  async customMethod(): Promise<{ data: CustomResult }> {
    // Lógica personalizada
    return { data: result };
  }
}
```

#### Servicios con Lógica Compleja

```typescript
// ✅ ACEPTABLE para servicios con lógica de negocio compleja
@Injectable()
export class ComplexService {
  constructor(private prisma: PrismaService) {}

  async complexOperation(dto: ComplexDto): Promise<{ data: Result }> {
    // Lógica compleja que justifica implementación personalizada
    const result = await this.prisma.$transaction(async (tx) => {
      // Operaciones complejas
      return result;
    });

    return { data: result };
  }
}
```

## Estándares de API

### Formato de Respuestas

#### Respuestas Individuales

```typescript
// ✅ CORRECTO - Todas las respuestas individuales
{
  data: T; // El objeto individual
}

// ❌ INCORRECTO
T; // Objeto directo sin wrapper
```

#### Respuestas Paginadas

```typescript
// ✅ CORRECTO
{
  data: T[],  // Array de objetos
  meta: {
    limit: number,
    page: number,
    total: number,
    totalPages: number
  }
}
```

#### Respuestas de Eliminación

```typescript
// ✅ CORRECTO
{
  message: string; // Mensaje descriptivo
}

// ❌ INCORRECTO
T; // Retornar la entidad eliminada
```

### Servicios Migrados a BaseService

Los siguientes servicios ya están migrados y deben mantenerse extendiendo BaseService:

#### Catálogos (100% migrados)

- ✅ BrandsService
- ✅ UnitsService

#### Compañías (100% migrados)

- ✅ BusinessCategoriesService
- ✅ BusinessSubcategoriesService

#### Empleados (80% migrados)

- ✅ EmployeeCategoriesService
- ✅ EmployeePositionsService
- ❌ EmployeeVacationsService (lógica compleja)
- ❌ EmployeeIncidentService (lógica compleja)

#### Ubicaciones (100% migrados)

- ✅ CitiesService
- ✅ CountriesService
- ✅ ProvincesService

#### Equipos (70% migrados)

- ✅ EquipmentCategoryService
- ✅ EquipmentModelService
- ✅ EquipmentTypeService
- ❌ EquipmentAxlesService (lógica compleja)

#### Neumáticos (25% migrados)

- ✅ TireSizesService
- ✅ TireModelsService
- ✅ TireAssignmentEventsService
- ❌ TirePositionsService (lógica personalizada)
- ❌ TireRecapsService (transacciones complejas)
- ❌ TireRotationsService (transacciones complejas)
- ❌ TireAssignmentsService (lógica compleja)
- ❌ TireEventsService (consultas complejas)
- ❌ TireInspectionsService (lógica compleja)

#### Otros Servicios (40% migrados)

- ✅ InspectionsService
- ❌ ContactsService (lógica compleja)
- ❌ DocumentsService (uploads complejos)
- ❌ AddressesService (lógica compleja)

### Controladores

Los controladores deben retornar directamente el resultado del servicio:

```typescript
// ✅ CORRECTO
@Post()
create(@Body() dto: CreateDto) {
  return this.service.create(dto); // Retorna { data: T }
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.service.findOne(+id); // Retorna { data: T }
}
```

### Testing

#### Verificación de Formato de Respuesta

```typescript
describe("MyService", () => {
  it("should return data wrapped in object", async () => {
    const result = await service.create(validDto);
    expect(result).toHaveProperty("data");
    expect(result.data).toBeDefined();
  });

  it("should return paginated response", async () => {
    const result = await service.findAll(query);
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("meta");
    expect(Array.isArray(result.data)).toBe(true);
  });
});
```

### Code Reviews

Durante las revisiones de código, verificar:

- [ ] Servicios nuevos extienden BaseService cuando corresponda
- [ ] Respuestas siguen formato `{ data: T }` para operaciones individuales
- [ ] Métodos `remove` retornan `{ message: string }`
- [ ] Controladores retornan directamente resultados del servicio
- [ ] Documentación Swagger refleja formatos correctos
- [ ] Tests verifican formatos de respuesta

### Migración de Servicios Existentes

Si encuentras un servicio que no sigue BaseService:

1. **Evaluar complejidad**: ¿Tiene lógica de negocio compleja?
2. **Si es simple**: Migrar a BaseService
3. **Si es complejo**: Mantener personalizado pero asegurar formato de respuesta
4. **Actualizar controlador**: Verificar que retorne correctamente
5. **Actualizar tests**: Verificar formatos de respuesta
6. **Documentar**: Actualizar esta guía si es necesario

### Beneficios de BaseService

- **Consistencia**: Patrón uniforme en toda la aplicación
- **Mantenibilidad**: Cambios en BaseService benefician a todos los servicios
- **Reducción de código**: ~600 líneas de código duplicado eliminadas
- **Type Safety**: Mejor soporte de TypeScript
- **Testing**: Comportamiento predecible facilita testing

### Servicios que NO deben migrar a BaseService

Mantener implementación personalizada para servicios con:

- **Transacciones complejas** (TireRecapsService, TireRotationsService)
- **Lógica de negocio especializada** (EmployeeVacationsService, ContactsService)
- **Operaciones masivas** (TireAssignmentsService)
- **Consultas avanzadas** (TireEventsService, ReportsService)
- **Integraciones externas** (DocumentsService con uploads)

### Documentación de API

Asegurar que Swagger refleje correctamente los formatos:

```typescript
@ApiResponse({
  status: 200,
  description: 'Entity created successfully',
  schema: {
    type: 'object',
    properties: {
      data: { $ref: '#/components/schemas/Entity' }
    }
  }
})
```

### Métricas Actuales

- **Total de servicios**: ~38
- **Servicios usando BaseService**: 21 (55.3%)
- **Código duplicado reducido**: ~600 líneas
- **Módulos completamente migrados**: Catálogos, Compañías, Ubicaciones

### Próximos Pasos

1. Migrar servicios restantes cuando la lógica lo permita
2. Mejorar BaseService con funcionalidades adicionales
3. Implementar validaciones automáticas de formato de respuesta
4. Crear herramientas de scaffolding para nuevos servicios
