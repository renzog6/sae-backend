//filepath: sae-backend/src/tires/tires.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTireDto } from "./dto/create-tire.dto";
import { UpdateTireDto } from "./dto/update-tire.dto";

@Injectable()
export class TiresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTireDto) {
    return this.prisma.tire.create({ data });
  }

  async findAll(options?: {
    page?: number;
    limit?: number;
    q?: string;
    status?: string;
  }) {
    const { page = 1, limit = 10, q, status } = options || {};

    const where: any = {};

    // Add status filter
    if (status) {
      where.status = status;
    }

    // Add search filter
    if (q) {
      where.OR = [
        { serialNumber: { contains: q } },
        {
          model: {
            OR: [
              { name: { contains: q } },
              {
                brand: {
                  name: { contains: q },
                },
              },
              {
                size: {
                  OR: [
                    { mainCode: { contains: q } },
                    {
                      aliases: {
                        some: {
                          aliasCode: { contains: q },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ];
    }

    const [tires, total] = await Promise.all([
      this.prisma.tire.findMany({
        where,
        include: {
          model: {
            include: {
              brand: true,
              size: { include: { aliases: true } },
            },
          },
          assignments: {
            include: {
              positionConfig: {
                include: { axle: { include: { equipment: true } } },
              },
            },
          },
          rotations: true,
          recaps: true,
          inspections: true,
          events: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.tire.count({ where }),
    ]);

    return {
      data: tires,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const tire = await this.prisma.tire.findUnique({
      where: { id: id },
      include: {
        model: {
          include: {
            brand: true,
            size: { include: { aliases: true } },
          },
        },
        assignments: {
          include: {
            positionConfig: {
              include: { axle: { include: { equipment: true } } },
            },
          },
        },
        rotations: true,
        recaps: true,
        inspections: true,
        events: true,
      },
    });
    if (!tire) throw new NotFoundException("Tire not found");
    return tire;
  }

  async update(id: number, data: UpdateTireDto) {
    return this.prisma.tire.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.tire.delete({
      where: { id },
    });
  }
}
