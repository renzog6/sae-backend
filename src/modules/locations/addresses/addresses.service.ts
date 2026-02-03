import { BaseService } from "@common/services/base.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Injectable()
export class AddressesService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.address;
  }

  protected override async hasDeletedAt(): Promise<boolean> {
    return false;
  }

  protected buildSearchConditions(q: string) {
    return [
      { street: { contains: q } },
      { city: { name: { contains: q } } },
      { postalCode: { contains: q } },
    ];
  }

  // Override findAll to use custom includes or keep existing logic?
  // Existing logic has standard filters + q + simple includes.
  // BaseService.findAll accepts includes in getModel? No.
  // BaseService.findAll takes 'where' and 'include'.
  // Let's refactor findAll to use super functionality but passing specific includes.

  async findAll(
    query: BaseQueryDto = new BaseQueryDto(),
    additionalWhere: any = {}
  ): Promise<BaseResponseDto<any>> {
    const include = {
      city: { include: { province: true } },
      company: true,
      person: true,
    };

    return super.findAll(query, additionalWhere, include);
  }

  // Custom findOne to include relations
  async findOne(id: number) {
    const include = {
      city: { include: { province: true } },
      company: true,
      person: true,
    };
    // BaseService.findOne doesn't support passing 'include'. It just does generic findUnique.
    // We should override it OR update BaseService (too risky).
    // Let's override it using super.findOne if possible? No, super.findOne calls this.model.findUnique({where:{id}}).
    // So we must manually implement it OR use prisma directly.

    const address = await this.prisma.address.findUnique({
      where: { id },
      include,
    });
    if (!address) throw new NotFoundException(`Address with ID ${id} not found`);
    return { data: address };
  }

  async create(dto: CreateAddressDto) {
    // If personId is present, enforce one address per person via upsert
    if (dto.personId) {
      const { personId, companyId: _ignoredCompany, ...rest } = dto as any;
      const address = await this.prisma.address.upsert({
        where: { personId },
        update: { ...rest },
        create: { ...rest, personId },
        include: {
          city: { include: { province: true } },
          company: true,
          person: true,
        },
      });
      return { data: address };
    }
    // Default create for company addresses or addresses without person linkage
    const address = await this.prisma.address.create({
      data: dto,
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
    return { data: address };
  }

  async createForPerson(personId: number, dto: CreateAddressDto) {
    const { personId: _ignored, companyId: _ignoredCompany, ...rest } = dto;
    // Upsert to ensure a single address per person
    const address = await this.prisma.address.upsert({
      where: { personId },
      update: { ...rest },
      create: { ...rest, personId },
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
    return { data: address };
  }

  async createForCompany(companyId: number, dto: CreateAddressDto) {
    const { personId: _ignored, companyId: _ignoredCompany, ...rest } = dto;
    const address = await this.prisma.address.create({
      data: { ...rest, companyId },
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
    return { data: address };
  }

  async update(id: number, dto: UpdateAddressDto) {
    const exists = await this.prisma.address.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Address with ID ${id} not found`);
    const address = await this.prisma.address.update({
      where: { id },
      data: dto,
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
    return { data: address };
  }

  async remove(id: number) {
    return super.remove(id); // Use BaseService soft-delete or hard-delete? 
    // Original implementation was delete() (HARD DELETE).
    // BaseService.remove() is usually SOFT DELETE if model supports it, or generic.
    // Let's assume strict parity: original used `delete`.
    // If I switch to super.remove(), check if Address has soft delete?
    // BaseService: `if (this.hasDeletedAt()) ... else delete`.
    // Address likely doesn't have deletedAt? `addresses.service.ts` didn't show it.
    // So super.remove() will likely do `delete`.
    // I'll stick to super.remove() for standard behavior.
  }

  findByCity(cityId: number) {
    return this.prisma.address.findMany({
      where: { cityId },
      include: { city: { include: { province: true } }, company: true },
    });
  }

  findByCompany(companyId: number) {
    return this.prisma.address.findMany({
      where: { companyId },
      include: { city: { include: { province: true } } },
    });
  }

  findByPerson(personId: number) {
    return this.prisma.address.findMany({
      where: { personId },
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
  }
}

