// filepath: sae-backend/src/persons/persons.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import { PrismaService } from "../prisma/prisma.service";
import { BaseService } from "../common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "../common/dto/base-query.dto";
import { Gender, MaritalStatus, PersonStatus } from "@prisma/client";

@Injectable()
export class PersonsService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.person;
  }

  protected buildSearchConditions(q: string) {
    return [
      { firstName: { contains: q, mode: "insensitive" } },
      { lastName: { contains: q, mode: "insensitive" } },
      { dni: { contains: q, mode: "insensitive" } },
      { cuil: { contains: q, mode: "insensitive" } },
    ];
  }

  create(dto: CreatePersonDto) {
    return this.prisma.person.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
        dni: dto.dni,
        cuil: dto.cuil,
        gender: dto.gender as Gender | undefined,
        maritalStatus: dto.maritalStatus as MaritalStatus | undefined,
        information: dto.information,
        status: (dto.status ?? PersonStatus.ACTIVE) as PersonStatus,
      },
      include: { employee: true, contacts: true, address: true },
    });
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const include = { employee: true, contacts: true, address: true };
    return super.findAll(query, {}, include);
  }

  async findOne(id: number) {
    const include = { employee: true, contacts: true, address: true };
    return super.findOne(id, include);
  }

  async update(id: number, dto: UpdatePersonDto) {
    await this.findOne(id);
    return this.prisma.person.update({
      where: { id },
      data: {
        ...(typeof dto.firstName !== "undefined"
          ? { firstName: dto.firstName }
          : {}),
        ...(typeof dto.lastName !== "undefined"
          ? { lastName: dto.lastName }
          : {}),
        ...(typeof dto.birthDate !== "undefined"
          ? { birthDate: dto.birthDate ? new Date(dto.birthDate as any) : null }
          : {}),
        ...(typeof dto.dni !== "undefined" ? { dni: dto.dni } : {}),
        ...(typeof dto.cuil !== "undefined" ? { cuil: dto.cuil } : {}),
        ...(typeof dto.gender !== "undefined"
          ? { gender: dto.gender as Gender | null }
          : {}),
        ...(typeof dto.maritalStatus !== "undefined"
          ? { maritalStatus: dto.maritalStatus as MaritalStatus | null }
          : {}),
        ...(typeof dto.information !== "undefined"
          ? { information: dto.information }
          : {}),
        ...(typeof dto.status !== "undefined"
          ? { status: dto.status as PersonStatus | null }
          : {}),
      },
      include: { employee: true, contacts: true, address: true },
    });
  }

  async remove(id: number): Promise<void> {
    await super.remove(id);
  }
}
