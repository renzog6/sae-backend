// filepath: sae-backend/src/modules/validators/validators.service.ts
import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { UNIQUE_VALIDATORS } from "./validators.config";
import { UniqueValidatorDto } from "./dto/unique-validator.dto";

@Injectable()
export class ValidatorsService {
  constructor(protected readonly prisma: PrismaService) {}

  async checkUnique(dto: UniqueValidatorDto) {
    const { model, field, value, excludeId } = dto;

    const allowedFields = UNIQUE_VALIDATORS[model];

    if (!allowedFields?.includes(field)) {
      throw new BadRequestException("Unique validation not allowed");
    }

    // Prisma dynamic model access
    const prismaModel = (this.prisma as any)[model.toLowerCase()] as any;

    if (!prismaModel) {
      throw new BadRequestException(`Model ${model} not supported`);
    }

    const where: Record<string, any> = {
      [field]: value,
    };

    if (excludeId) {
      where.id = { not: Number(excludeId) };
    }

    const exists = await prismaModel.findFirst({
      where,
      select: { id: true },
    });

    return {
      exists: !!exists,
    };
  }
}
