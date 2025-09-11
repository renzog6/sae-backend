import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  // Implementar métodos CRUD y lógica de negocio aquí
  // Por ahora, solo implementamos métodos básicos

  async findAll() {
    return this.prisma.employee.findMany();
  }

  async findOne(id: number) {
    return this.prisma.employee.findUnique({
      where: { id },
    });
  }
}