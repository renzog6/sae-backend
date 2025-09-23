// filepath: sae-backend/src/companies/business-subcategories/business-subcategories.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBusinessSubCategoryDto } from './dto/create-business-subcategory.dto';
import { UpdateBusinessSubCategoryDto } from './dto/update-business-subcategory.dto';

@Injectable()
export class BusinessSubcategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.businessSubCategory.findMany();
  }

  findAllByCategory(categoryId: number) {
    return this.prisma.businessSubCategory.findMany({ where: { businessCategoryId: categoryId } });
  }

  findOne(id: number) {
    return this.prisma.businessSubCategory.findUnique({ where: { id } });
  }

  create(dto: CreateBusinessSubCategoryDto) {
    return this.prisma.businessSubCategory.create({ data: dto });
  }

  update(id: number, dto: UpdateBusinessSubCategoryDto) {
    return this.prisma.businessSubCategory.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.businessSubCategory.delete({ where: { id } });
  }
}
