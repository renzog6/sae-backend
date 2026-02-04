import { Resolver, Query, Args } from "@nestjs/graphql";
import { InspectionsService } from "./services/inspections.service";
import { Inspection } from "./entities/inspection.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { CreateInspectionDto } from "./dto/create-inspection.dto";
import { UpdateInspectionDto } from "./dto/update-inspection.dto";

@Resolver(() => Inspection)
export class InspectionsResolver extends BaseResolver(Inspection, {
    createInput: CreateInspectionDto,
    updateInput: UpdateInspectionDto,
}) {
    constructor(private readonly inspectionsService: InspectionsService) {
        super(inspectionsService);
    }
}
