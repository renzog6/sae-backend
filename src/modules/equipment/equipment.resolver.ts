import { Resolver, Query, Args, InputType, Field, Int } from "@nestjs/graphql";
import { EquipmentService } from "./equipment.service";
import { Equipment } from "./entities/equipment.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { Paginated } from "@common/dto/paginated-result.gql";
import { PaginationArgs } from "@common/dto/pagination.args";
import { EquipmentStatus } from "@prisma/client";
import { CreateEquipmentDto } from "./dto/create-equipment.dto";
import { UpdateEquipmentDto } from "./dto/update-equipment.dto";

@InputType()
export class EquipmentFilterInput {
    @Field(() => Int, { nullable: true })
    typeId?: number;

    @Field(() => Int, { nullable: true })
    modelId?: number;

    @Field(() => Int, { nullable: true })
    categoryId?: number;

    @Field(() => Int, { nullable: true })
    year?: number;

    @Field(() => EquipmentStatus, { nullable: true })
    status?: EquipmentStatus;
}

const PaginatedEquipment = Paginated(Equipment);

@Resolver(() => Equipment)
export class EquipmentResolver extends BaseResolver(Equipment, {
    createInput: CreateEquipmentDto,
    updateInput: UpdateEquipmentDto,
}) {
    constructor(private readonly equipmentService: EquipmentService) {
        super(equipmentService);
    }

    @Query(() => PaginatedEquipment, { name: "findAllEquipment" })
    async findAllEquipment(
        @Args() args: PaginationArgs,
        @Args("filter", { nullable: true }) filter?: EquipmentFilterInput
    ): Promise<any> {
        const query = { ...args, ...filter, deleted: "exclude" } as any;
        const result = await this.equipmentService.findAll(query);
        return result;
    }
}
