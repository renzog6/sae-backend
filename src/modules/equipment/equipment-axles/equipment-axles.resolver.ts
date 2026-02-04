import { Resolver } from "@nestjs/graphql";
import { EquipmentAxlesService } from "./equipment-axles.service";
import { EquipmentAxle } from "./entity/equipment-axle.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { CreateEquipmentAxleDto } from "./dto/create-equipment-axle.dto";
import { UpdateEquipmentAxleDto } from "./dto/update-equipment-axle.dto";

@Resolver(() => EquipmentAxle)
export class EquipmentAxlesResolver extends BaseResolver(EquipmentAxle, {
    createInput: CreateEquipmentAxleDto,
    updateInput: UpdateEquipmentAxleDto,
}) {
    constructor(private readonly equipmentAxlesService: EquipmentAxlesService) {
        super(equipmentAxlesService);
    }
}
