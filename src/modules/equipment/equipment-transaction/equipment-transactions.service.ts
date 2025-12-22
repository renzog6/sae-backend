// filepath: sae-backend/src/modules/equipment/equipment-transaction/equipment-transactions.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateEquipmentTransactionDto } from "./dto/create-equipment-transaction.dto";
import { EquipmentTransactionType, Currency } from "@prisma/client";

@Injectable()
export class EquipmentTransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEquipmentTransactionDto) {
    return this.prisma.$transaction(async (tx) => {
      const equipment = await tx.equipment.findUnique({
        where: { id: dto.equipmentId },
      });

      if (!equipment) {
        throw new Error("Equipment not found");
      }

      // Validaciones de negocio
      if (dto.type === "SALE" && equipment.status === "SOLD") {
        throw new Error("Equipment already sold");
      }

      if (dto.type === "SALE" && !equipment.isActive) {
        throw new Error("Equipment not active");
      }

      if (dto.type === "PURCHASE" && equipment.status === "ACTIVE") {
        throw new Error("Equipment already active");
      }

      if (dto.type === "SALE") {
        const previousSale = await tx.equipmentTransaction.findFirst({
          where: {
            equipmentId: equipment.id,
            type: "SALE",
          },
        });

        if (previousSale) {
          throw new Error("Equipment already sold");
        }
      }

      // Crear transacción
      const transaction = await tx.equipmentTransaction.create({
        data: {
          equipmentId: dto.equipmentId,
          companyId: dto.companyId,
          type: dto.type as EquipmentTransactionType,
          transactionDate: new Date(dto.date),
          amount: dto.amount,
          currency: dto.currency as Currency,
          exchangeRate: dto.exchangeRate,
          observation: dto.observation,
        },
      });

      // Actualizar estado del equipo
      if (dto.type === "SALE") {
        await tx.equipment.update({
          where: { id: equipment.id },
          data: {
            status: "SOLD",
            isActive: false,
          },
        });
      }

      if (dto.type === "PURCHASE") {
        await tx.equipment.update({
          where: { id: equipment.id },
          data: {
            status: "ACTIVE",
            isActive: true,
          },
        });
      }

      // Crear historial
      await tx.historyLog.create({
        data: {
          title: dto.type === "SALE" ? "Equipment Sold" : "Equipment Purchased",
          type: "EMPLOYEE_ILLNESS", // Usar un tipo existente temporalmente
          equipmentId: equipment.id,
          description: dto.observation,
          metadata: JSON.stringify({
            amount: dto.amount,
            currency: dto.currency,
            exchangeRate: dto.exchangeRate,
          }),
        },
      });

      return transaction;
    });
  }

  async findByEquipment(equipmentId: number) {
    return this.prisma.equipmentTransaction.findMany({
      where: { equipmentId },
      include: {
        equipment: true,
        company: true,
      },
      orderBy: { transactionDate: "desc" },
    });
  }
}
