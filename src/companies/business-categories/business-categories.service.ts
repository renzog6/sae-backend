// filepath: sae-backend/src/companies/business-categories/business-categories.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBusinessCategoryDto } from './dto/create-business-category.dto';
import { UpdateBusinessCategoryDto } from './dto/update-business-category.dto';

@Injectable()
export class BusinessCategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.businessCategory.findMany({ include: { subCategories: true } });
  }

  findOne(id: number) {
    return this.prisma.businessCategory.findUnique({ where: { id } });
  }

  create(dto: CreateBusinessCategoryDto) {
    return this.prisma.businessCategory.create({ data: dto });
  }

  update(id: number, dto: UpdateBusinessCategoryDto) {
    return this.prisma.businessCategory.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.businessCategory.delete({ where: { id } });
  }
}
