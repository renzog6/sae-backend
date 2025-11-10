// filepath: sae-backend/src/modules/persons/family/family.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFamilyDto } from "./dto/create-family.dto";
import { UpdateFamilyDto } from "./dto/update-family.dto";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class FamilyService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateFamilyDto) {
    return this.prisma.family.create({
      data: {
        relationship: dto.relationship,
        person: { connect: { id: dto.personId } },
        relative: { connect: { id: dto.relativeId } },
      },
      include: { person: true, relative: true },
    });
  }

  findAll() {
    return this.prisma.family.findMany({
      include: { person: true, relative: true },
      orderBy: { id: "desc" },
    });
  }

  async findOne(id: number) {
    const rec = await this.prisma.family.findUnique({
      where: { id },
      include: { person: true, relative: true },
    });
    if (!rec) throw new NotFoundException(`Family with ID ${id} not found`);
    return rec;
  }

  async update(id: number, dto: UpdateFamilyDto) {
    await this.findOne(id);
    return this.prisma.family.update({
      where: { id },
      data: {
        ...(typeof dto.relationship !== "undefined"
          ? { relationship: dto.relationship }
          : {}),
        ...(typeof (dto as any).personId !== "undefined"
          ? { person: { connect: { id: (dto as any).personId } } }
          : {}),
        ...(typeof (dto as any).relativeId !== "undefined"
          ? { relative: { connect: { id: (dto as any).relativeId } } }
          : {}),
      },
      include: { person: true, relative: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.family.delete({ where: { id } });
    return { id };
  }
}
