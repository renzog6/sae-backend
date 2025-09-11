import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);

  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    // Create contact
    const contact = await this.prisma.contact.create({
      data: {
        name: `${createContactDto.firstName} ${createContactDto.lastName}`,
        type: createContactDto.position || 'contact',
        data: createContactDto.email || createContactDto.phone || createContactDto.mobile,
        information: createContactDto.notes,
        companyId: createContactDto.companyId ? parseInt(createContactDto.companyId) : undefined,
      },
      include: {
        company: true,
      },
    });

    return contact;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit, skip } = paginationDto;

    const [contacts, total] = await Promise.all([
      this.prisma.contact.findMany({
        skip,
        take: limit,
        include: {
          company: true,
        },
        orderBy: {
          name: 'asc',
        },
      }),
      this.prisma.contact.count(),
    ]);

    return new PaginatedResponseDto(contacts, total, page, limit);
  }

  async findByCompany(companyId: string, paginationDto: PaginationDto) {
    const { page, limit, skip } = paginationDto;

    const [contacts, total] = await Promise.all([
      this.prisma.contact.findMany({
        where: {
          companyId: parseInt(companyId),
        },
        skip,
        take: limit,
        orderBy: {
          name: 'asc',
        },
      }),
      this.prisma.contact.count({
        where: {
          companyId: parseInt(companyId),
        },
      }),
    ]);

    return new PaginatedResponseDto(contacts, total, page, limit);
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id: parseInt(id) },
      include: {
        company: true,
      },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    // Check if contact exists
    await this.findOne(id);

    // Update contact
    const contact = await this.prisma.contact.update({
      where: { id: parseInt(id) },
      data: {
        name: updateContactDto.firstName && updateContactDto.lastName 
          ? `${updateContactDto.firstName} ${updateContactDto.lastName}` 
          : undefined,
        type: updateContactDto.position || undefined,
        data: updateContactDto.email || updateContactDto.phone || updateContactDto.mobile || undefined,
        information: updateContactDto.notes || undefined,
        companyId: updateContactDto.companyId ? parseInt(updateContactDto.companyId) : undefined,
      },
      include: {
        company: true,
      },
    });

    return contact;
  }

  async remove(id: string) {
    // Check if contact exists
    await this.findOne(id);

    // Delete contact
    await this.prisma.contact.delete({
      where: { id: parseInt(id) },
    });

    return { id };
  }
}