import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Gender, MaritalStatus, PersonStatus } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PersonsService {
  constructor(private prisma: PrismaService) {}

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

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.person.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: { employee: true, contacts: true, address: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.person.count(),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const rec = await this.prisma.person.findUnique({
      where: { id },
      include: { employee: true, contacts: true, address: true },
    });
    if (!rec) throw new NotFoundException(`Person with ID ${id} not found`);
    return rec;
  }

  async update(id: number, dto: UpdatePersonDto) {
    await this.findOne(id);
    return this.prisma.person.update({
      where: { id },
      data: {
        ...(typeof dto.firstName !== 'undefined' ? { firstName: dto.firstName } : {}),
        ...(typeof dto.lastName !== 'undefined' ? { lastName: dto.lastName } : {}),
        ...(typeof dto.birthDate !== 'undefined' ? { birthDate: dto.birthDate ? new Date(dto.birthDate as any) : null } : {}),
        ...(typeof dto.dni !== 'undefined' ? { dni: dto.dni } : {}),
        ...(typeof dto.cuil !== 'undefined' ? { cuil: dto.cuil } : {}),
        ...(typeof dto.gender !== 'undefined' ? { gender: dto.gender as Gender | null } : {}),
        ...(typeof dto.maritalStatus !== 'undefined' ? { maritalStatus: dto.maritalStatus as MaritalStatus | null } : {}),
        ...(typeof dto.information !== 'undefined' ? { information: dto.information } : {}),
        ...(typeof dto.status !== 'undefined' ? { status: dto.status as PersonStatus | null } : {}),
      },
      include: { employee: true, contacts: true, address: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.person.delete({ where: { id } });
    return { id };
  }
}
