// filepath: sae-backend/src/modules/contacts/services/contacts.service.ts
import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);

  constructor(private prisma: PrismaService) {}

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

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "id", sortOrder = "desc" } = query;

    // Build search filter
    const where: any = {};
    if (q) {
      where.OR = [
        { type: { contains: q } },
        { value: { contains: q } },
        { label: { contains: q } },
      ];
    }

    // Get total count for pagination
    const total = await this.prisma.contact.count({ where });

    // Get paginated data
    const contacts = await this.prisma.contact.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: sortOrder },
      include: { contactLinks: { include: { company: true, person: true } } },
    });

    return new BaseResponseDto(
      contacts,
      total,
      query.page || 1,
      query.limit || 10
    );
  }

  async findByPerson(
    personId: string,
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "id", sortOrder = "desc" } = query;
    const personIdNum = parseInt(personId);

    const whereClause: any = {
      contactLinks: { some: { personId: personIdNum } },
    };

    // Add search filter if provided
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
        orderBy: { [sortBy]: sortOrder },
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
    const { skip, take, q, sortBy = "id", sortOrder = "desc" } = query;
    const companyIdNum = parseInt(companyId);

    const whereClause: any = {
      contactLinks: { some: { companyId: companyIdNum } },
    };

    // Add search filter if provided
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
        orderBy: { [sortBy]: sortOrder },
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

  async findOne(id: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id: parseInt(id) },
      include: { contactLinks: { include: { company: true, person: true } } },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return { data: contact };
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    // Check if contact exists
    await this.findOne(id);

    // Update contact core fields
    const contact = await this.prisma.contact.update({
      where: { id: parseInt(id) },
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
      // remove existing company links and optionally create new
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

    return await this.findOne(String(contact.id));
  }

  async remove(id: string) {
    // Check if contact exists
    await this.findOne(id);

    // Delete links then contact
    const contactId = parseInt(id);
    await this.prisma.contactLink.deleteMany({ where: { contactId } });
    await this.prisma.contact.delete({ where: { id: contactId } });

    return { id };
  }
}
