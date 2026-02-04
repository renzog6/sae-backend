import { Resolver, Query, Args } from "@nestjs/graphql";
import { EquipmentTypeService } from "./equipment-type.service";
import { EquipmentType } from "./entity/equipment-type.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { Paginated } from "@common/dto/paginated-result.gql";
import { PaginationArgs } from "@common/dto/pagination.args";
import { CreateEquipmentTypeDto } from "./dto/create-equipment-type.dto";
import { UpdateEquipmentTypeDto } from "./dto/update-equipment-type.dto";

const PaginatedEquipmentType = Paginated(EquipmentType);

@Resolver(() => EquipmentType)
export class EquipmentTypesResolver extends BaseResolver(EquipmentType, {
    createInput: CreateEquipmentTypeDto,
    updateInput: UpdateEquipmentTypeDto,
}) {
    constructor(private readonly equipmentTypeService: EquipmentTypeService) {
        super(equipmentTypeService);
    }

    @Query(() => PaginatedEquipmentType, { name: "findAllEquipmentTypes" })
    async findAllEquipmentTypes(@Args() args: PaginationArgs): Promise<any> {
        const query = { ...args, deleted: "exclude" } as any;
        const result = await this.equipmentTypeService.findAll(query);
        return result;
    }
}
