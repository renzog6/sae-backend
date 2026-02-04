import { Resolver, Mutation, Query, Args, Int } from "@nestjs/graphql";
import { TireAssignmentsService } from "./tire-assignments.service";
import { TireAssignment } from "../entities/tire-assignment.entity";
import { MountTireDto } from "./dto/mount-tire.dto";
import { UnmountTireDto } from "./dto/unmount-tire.dto";

@Resolver(() => TireAssignment)
export class TireAssignmentsResolver {
    constructor(private readonly tireAssignmentsService: TireAssignmentsService) { }

    @Mutation(() => TireAssignment, { name: "mountTire" })
    async mount(@Args("input") input: MountTireDto) {
        const result = await this.tireAssignmentsService.mount(input);
        return result.data;
    }

    @Mutation(() => Boolean, { name: "unmountTire" })
    async unmount(@Args("input") input: UnmountTireDto) {
        await this.tireAssignmentsService.unmount(input);
        return true;
    }

    @Query(() => [TireAssignment], { name: "findTireAssignmentsByTire" })
    async findByTire(@Args("tireId", { type: () => Int }) tireId: number) {
        return this.tireAssignmentsService.findByTire(tireId);
    }

    @Query(() => [TireAssignment], { name: "findOpenTireAssignments" })
    async findOpen() {
        const result = await this.tireAssignmentsService.findOpenAssignments();
        return result.data;
    }

    @Query(() => [TireAssignment], { name: "findOpenTireAssignmentsByEquipment" })
    async findOpenByEquipment(@Args("equipmentId", { type: () => Int }) equipmentId: number) {
        const result = await this.tireAssignmentsService.findOpenAssignmentsByEquipment(equipmentId);
        return result.data;
    }
}
