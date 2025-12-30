// filepath: sae-backend/src/modules/equipment/equipment-transaction/equipment-transactions.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseResponseDto } from "@common/dto";
import { CreateEquipmentTransactionDto } from "./dto/create-equipment-transaction.dto";
import { EquipmentTransactionQueryDto } from "./dto/equipment-transaction-query.dto";
import { EquipmentTransactionType, Currency } from "@prisma/client";
import { EquipmentTransaction } from "./entity/equipment-transaction.entity";

@Injectable()
export class EquipmentTransactionsService extends BaseService<EquipmentTransaction> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.equipmentTransaction;
  }

  protected buildSearchConditions(q: string) {
    return [{ observation: { contains: q } }];
  }

  protected override getDefaultOrderBy() {
    return { transactionDate: "desc" };
  }

  override async findAll(
    query: EquipmentTransactionQueryDto = new EquipmentTransactionQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { type } = query;
    const additionalWhere: any = {};
    if (type) {
      additionalWhere.type = type;
    }

    const result = await super.findAll(query, additionalWhere, {
      equipment: true,
      company: true,
    });

    // Transform result to fix NaN issue (Decimal to Number)
    result.data = result.data.map((tx: any) => ({
      ...tx,
      amount: Number(tx.amount),
      exchangeRate: tx.exchangeRate ? Number(tx.exchangeRate) : null,
    }));

    return result;
  }

  async create(createEquipmentTransactionDto: CreateEquipmentTransactionDto) {
    const transaction = await this.prisma.$transaction(async (tx) => {
      const equipment = await tx.equipment.findUnique({
        where: { id: createEquipmentTransactionDto.equipmentId },
      });

      if (!equipment) {
        throw new NotFoundException("Equipment not found");
      }

      // Validaciones de negocio
      if (
        createEquipmentTransactionDto.type === "SALE" &&
        equipment.status === "SOLD"
      ) {
        throw new BadRequestException("Equipment already sold");
      }

      if (
        createEquipmentTransactionDto.type === "SALE" &&
        !equipment.isActive
      ) {
        throw new BadRequestException("Equipment not active");
      }

      if (
        createEquipmentTransactionDto.type === "PURCHASE" &&
        equipment.status === "ACTIVE"
      ) {
        throw new BadRequestException("Equipment already active");
      }

      if (createEquipmentTransactionDto.type === "SALE") {
        const previousSale = await tx.equipmentTransaction.findFirst({
          where: {
            equipmentId: equipment.id,
            type: "SALE",
          },
        });

        if (previousSale) {
          throw new BadRequestException("Equipment already sold");
        }
      }

      // Calcular amountARS
      const exchangeRate = createEquipmentTransactionDto.exchangeRate || 1;
      const amountARS = createEquipmentTransactionDto.amount * exchangeRate;

      // Crear transacción
      const transaction = await tx.equipmentTransaction.create({
        data: {
          equipmentId: createEquipmentTransactionDto.equipmentId,
          companyId: createEquipmentTransactionDto.companyId,
          type: createEquipmentTransactionDto.type as EquipmentTransactionType,
          transactionDate: new Date(createEquipmentTransactionDto.date),
          amount: createEquipmentTransactionDto.amount,
          currency: createEquipmentTransactionDto.currency as Currency,
          exchangeRate: createEquipmentTransactionDto.exchangeRate,
          amountARS: amountARS,
          observation: createEquipmentTransactionDto.observation,
        },
        include: {
          equipment: true,
          company: true,
        },
      });

      // Actualizar estado del equipo
      if (createEquipmentTransactionDto.type === "SALE") {
        await tx.equipment.update({
          where: { id: equipment.id },
          data: {
            status: "SOLD",
            isActive: false,
          },
        });
      }

      if (createEquipmentTransactionDto.type === "PURCHASE") {
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
          title:
            createEquipmentTransactionDto.type === "SALE"
              ? "Equipment Sold"
              : "Equipment Purchased",
          type: "EQUIPMENT_MAINTENANCE",
          equipmentId: equipment.id,
          description: createEquipmentTransactionDto.observation,
          metadata: JSON.stringify({
            amount: createEquipmentTransactionDto.amount,
            currency: createEquipmentTransactionDto.currency,
            exchangeRate: createEquipmentTransactionDto.exchangeRate,
          }),
        },
      });

      return transaction;
    });

    return {
      data: {
        ...transaction,
        amount: Number(transaction.amount),
        exchangeRate: transaction.exchangeRate
          ? Number(transaction.exchangeRate)
          : null,
      } as unknown as EquipmentTransaction,
    };
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
