import { Resolver, Query, Args } from "@nestjs/graphql";
import { EquipmentModelService } from "./equipment-model.service";
import { EquipmentModel } from "./entity/equipment-model.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { Paginated } from "@common/dto/paginated-result.gql";
import { PaginationArgs } from "@common/dto/pagination.args";

const PaginatedEquipmentModel = Paginated(EquipmentModel);

@Resolver(() => EquipmentModel)
export class EquipmentModelsResolver extends BaseResolver(EquipmentModel) {
    constructor(private readonly equipmentModelService: EquipmentModelService) {
        super(equipmentModelService);
    }

    @Query(() => PaginatedEquipmentModel, { name: "findAllEquipmentModels" })
    async findAllEquipmentModels(@Args() args: PaginationArgs): Promise<any> {
        const query = { ...args, deleted: "exclude" } as any;
        const result = await this.equipmentModelService.findAll(query);
        return result;
    }
}
