//filepath: sae-backend/src/tires/tire-recaps/tire-recaps.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateTireRecapDto } from "./dto/create-tire-recap.dto";
import { UpdateTireRecapDto } from "./dto/update-tire-recap.dto";
import { TireAssignmentEventsService } from "@modules/tires/tire-assignments/tire-events.service";

@Injectable()
export class TireRecapsService {
  constructor(
    private prisma: PrismaService,
    private events: TireAssignmentEventsService
  ) {}

  async create(dto: CreateTireRecapDto, userId?: number) {
    const tire = await this.prisma.tire.findUnique({
      where: { id: dto.tireId },
    });
    if (!tire) throw new NotFoundException("Tire not found");

    // calcular número de recapado
    const lastRecap = await this.prisma.tireRecap.findFirst({
      where: { tireId: dto.tireId },
      orderBy: { recapNumber: "desc" },
    });
    const nextRecapNumber = lastRecap ? lastRecap.recapNumber + 1 : 1;

    const recap = await this.prisma.$transaction(async (tx) => {
      // crear registro de recapado
      const newRecap = await tx.tireRecap.create({
        data: {
          tireId: dto.tireId,
          provider: dto.provider ?? null,
          cost: dto.cost ?? null,
          notes: dto.notes ?? null,
          recapNumber: nextRecapNumber,
          kmAtRecap: dto.kmAtRecap ?? null,
          recapType: dto.recapType ?? null,
          createdBy: userId ?? null,
        },
      });

      // actualizar estado y contador del neumático con denormalización
      await tx.tire.update({
        where: { id: dto.tireId },
        data: {
          status: "RECAP",
          recapCount: { increment: 1 },
          lastRecapAt: newRecap.recapDate,
          lastRecapId: newRecap.id,
        },
      });

      // crear evento
      await tx.tireEvent.create({
        data: {
          tireId: dto.tireId,
          eventType: "RECAP",
          description: dto.notes ?? `Recapado N°${nextRecapNumber}`,
          userId,
          metadata: JSON.stringify({
            provider: dto.provider,
            cost: dto.cost,
            recapNumber: nextRecapNumber,
            kmAtRecap: dto.kmAtRecap,
            recapType: dto.recapType,
          }),
        },
      });

      return newRecap;
    });

    // evento global adicional
    await this.events.createEvent({
      tireId: dto.tireId,
      eventType: "RECAP",
      userId,
      description: dto.notes,
      metadata: {
        provider: dto.provider,
        cost: dto.cost,
        recapNumber: nextRecapNumber,
        kmAtRecap: dto.kmAtRecap,
        recapType: dto.recapType,
      },
    });

    return { data: recap };
  }

  async findAll() {
    return this.prisma.tireRecap.findMany({
      include: { tire: true },
      orderBy: { recapDate: "desc" },
    });
  }

  async findByTire(tireId: number) {
    return this.prisma.tireRecap.findMany({
      where: { tireId },
      orderBy: { recapNumber: "asc" },
    });
  }

  async update(id: number, dto: UpdateTireRecapDto) {
    const recap = await this.prisma.tireRecap.update({
      where: { id },
      data: dto,
    });
    return { data: recap };
  }

  async remove(id: number) {
    await this.prisma.tireRecap.delete({
      where: { id },
    });
    return { message: "Tire recap deleted successfully" };
  }
}
