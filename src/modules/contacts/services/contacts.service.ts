import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";

@Injectable()
export class ContactsService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.contact;
  }

  // Optional: buildSearchConditions if needed for super.findAll
  protected buildSearchConditions(q: string) {
    return [
      { type: { contains: q } },
      { value: { contains: q } },
      { label: { contains: q } },
    ];
  }

  async create(createContactDto: CreateContactDto) {
    // Create contact and optional link(s)
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
        contactLinks: { include: { company: true, person: true } },
      },
    });

    return { data: contact };
  }

  protected override getDefaultOrderBy() {
    return { id: "desc" };
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // We can use super.findAll but we need to ensure 'contactLinks' inclusion.
    const include = { contactLinks: { include: { company: true, person: true } } };
    return super.findAll(query, {}, include);
  }

  async findByPerson(
    personId: string,
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q } = query;
    const personIdNum = parseInt(personId);

    const whereClause: any = {
      contactLinks: { some: { personId: personIdNum } },
    };

    if (q) {
      whereClause.OR = [
        { type: { contains: q } },
        { value: { contains: q } },
        { label: { contains: q } },
      ];
    }

    const [contacts, total] = await Promise.all([
      this.prisma.contact.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: { id: "desc" },
        include: { contactLinks: { include: { person: true } } },
      }),
      this.prisma.contact.count({ where: whereClause }),
    ]);

    return new BaseResponseDto(
      contacts,
      total,
      query.page || 1,
      query.limit || 10
    );
  }

  async findByCompany(
    companyId: string,
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q } = query;
    const companyIdNum = parseInt(companyId);

    const whereClause: any = {
      contactLinks: { some: { companyId: companyIdNum } },
    };

    if (q) {
      whereClause.OR = [
        { type: { contains: q } },
        { value: { contains: q } },
        { label: { contains: q } },
      ];
    }

    const [contacts, total] = await Promise.all([
      this.prisma.contact.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: { id: "desc" },
        include: { contactLinks: { include: { company: true } } },
      }),
      this.prisma.contact.count({ where: whereClause }),
    ]);

    return new BaseResponseDto(
      contacts,
      total,
      query.page || 1,
      query.limit || 10
    );
  }

  async findOne(id: number) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
      include: { contactLinks: { include: { company: true, person: true } } },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return { data: contact };
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    // Check if contact exists
    await this.findOne(id);

    // Update contact core fields
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

    // Manage links if provided
    const ops: Promise<any>[] = [];
    if (typeof updateContactDto.companyId !== "undefined") {
      ops.push(
        this.prisma.contactLink.deleteMany({
          where: { contactId: contact.id, companyId: { not: null } },
        })
      );
      if (updateContactDto.companyId !== null) {
        ops.push(
          this.prisma.contactLink.create({
            data: {
              contactId: contact.id,
              companyId: updateContactDto.companyId!,
            },
          })
        );
      }
    }
    if (typeof updateContactDto.personId !== "undefined") {
      ops.push(
        this.prisma.contactLink.deleteMany({
          where: { contactId: contact.id, personId: { not: null } },
        })
      );
      if (updateContactDto.personId !== null) {
        ops.push(
          this.prisma.contactLink.create({
            data: {
              contactId: contact.id,
              personId: updateContactDto.personId!,
            },
          })
        );
      }
    }
    if (ops.length) await Promise.all(ops);

    return await this.findOne(contact.id);
  }

  async remove(id: number) {
    // Check if contact exists
    await this.findOne(id);

    // Delete links then contact (manual cascade)
    await this.prisma.contactLink.deleteMany({ where: { contactId: id } });
    await this.prisma.contact.delete({ where: { id } });

    return { message: "Contact deleted successfully" };
  }
}

