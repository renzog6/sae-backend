import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateInspectionTypeDto } from "../dto/create-inspection-type.dto";
import { InspectionType } from "../entities/inspection-type.entity";

@Injectable()
export class InspectionTypeService extends BaseService<InspectionType> {
    constructor(protected prisma: PrismaService) {
        super(prisma);
    }

    protected getModel() {
        return this.prisma.inspectionType;
    }

    protected buildSearchConditions(q: string) {
        return [{ name: { contains: q } }];
    }

    async create(data: CreateInspectionTypeDto) {
        const type = await this.prisma.inspectionType.create({ data });
        return { data: type };
    }
}
