//filepath: sae-backend/src/modules/contacts/services/contacts.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";
import { Prisma } from "@prisma/client";

export interface ContactContextFilter {
  companyId?: number;
  personId?: number;
}

@Injectable()
export class ContactsService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.contact;
  }

  protected override getDefaultOrderBy() {
    return { id: "desc" };
  }

  protected buildSearchConditions(q: string) {
    return [
      { type: { contains: q } },
      { value: { contains: q } },
      { label: { contains: q } },
    ];
  }

  private buildContextWhere(
    filter?: ContactContextFilter,
    q?: string
  ): any {
    const where: any = {};

    if (filter?.companyId) {
      where.contactLinks = { some: { companyId: filter.companyId } };
    }

    if (filter?.personId) {
      where.contactLinks = { some: { personId: filter.personId } };
    }

    if (q) {
      where.OR = this.buildSearchConditions(q);
    }

    return where;
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto(),
    filter?: ContactContextFilter
  ): Promise<BaseResponseDto<any>> {
    const where = this.buildContextWhere(filter, query.q);

    const include = {
      contactLinks: {
        include: {
          company: true,
          person: true,
        },
      },
    };

    return super.findAll(
      query,
      where,
      include
    );
  }

  async findOne(id: number) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
      include: {
        contactLinks: {
          include: {
            company: true,
            person: true,
          },
        },
      },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return { data: contact };
  }

  async create(createContactDto: CreateContactDto) {
    const contact = await this.prisma.contact.create({
      data: {
        type: createContactDto.type,
        value: createContactDto.value,
        label: createContactDto.label,
        information: createContactDto.information,
        contactLinks:
          createContactDto.companyId || createContactDto.personId
            ? {
              create: [
                ...(createContactDto.companyId
                  ? [{ companyId: createContactDto.companyId }]
                  : []),
                ...(createContactDto.personId
                  ? [{ personId: createContactDto.personId }]
                  : []),
              ],
            }
            : undefined,
      },
      include: {
        contactLinks: {
          include: {
            company: true,
            person: true,
          },
        },
      },
    });

    return { data: contact };
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    await this.findOne(id);

    const contact = await this.prisma.contact.update({
      where: { id },
      data: {
        type: updateContactDto.type,
        value: updateContactDto.value,
        label: updateContactDto.label,
        information: updateContactDto.information,
      },
      include: { contactLinks: true },
    });

    const ops: Prisma.PrismaPromise<any>[] = [];

    if (typeof updateContactDto.companyId !== "undefined") {
      ops.push(
        this.prisma.contactLink.deleteMany({
          where: { contactId: id, companyId: { not: null } },
        })
      );

      if (updateContactDto.companyId !== null) {
        ops.push(
          this.prisma.contactLink.create({
            data: {
              contactId: id,
              companyId: updateContactDto.companyId,
            },
          })
        );
      }
    }

    if (typeof updateContactDto.personId !== "undefined") {
      ops.push(
        this.prisma.contactLink.deleteMany({
          where: { contactId: id, personId: { not: null } },
        })
      );

      if (updateContactDto.personId !== null) {
        ops.push(
          this.prisma.contactLink.create({
            data: {
              contactId: id,
              personId: updateContactDto.personId,
            },
          })
        );
      }
    }

    if (ops.length) {
      await this.prisma.$transaction(ops);
    }

    return this.findOne(contact.id);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.contactLink.deleteMany({
      where: { contactId: id },
    });

    await this.prisma.contact.delete({
      where: { id },
    });

    return { message: "Contact deleted successfully" };
  }
}
