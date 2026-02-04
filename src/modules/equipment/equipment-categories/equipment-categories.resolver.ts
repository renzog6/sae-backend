import { Resolver, Query, Args } from "@nestjs/graphql";
import { EquipmentCategoryService } from "./equipment-category.service";
import { EquipmentCategory } from "./entity/equipment-category.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { Paginated } from "@common/dto/paginated-result.gql";
import { PaginationArgs } from "@common/dto/pagination.args";

const PaginatedEquipmentCategory = Paginated(EquipmentCategory);

@Resolver(() => EquipmentCategory)
export class EquipmentCategoriesResolver extends BaseResolver(EquipmentCategory) {
    constructor(private readonly equipmentCategoryService: EquipmentCategoryService) {
        super(equipmentCategoryService);
    }

    @Query(() => PaginatedEquipmentCategory, { name: "findAllEquipmentCategories" })
    async findAllEquipmentCategories(@Args() args: PaginationArgs): Promise<any> {
        const query = { ...args, deleted: "exclude" } as any;
        const result = await this.equipmentCategoryService.findAll(query);
        return result;
    }
}
