//filepath: sae-backend/src/tires/tire-rotations/tire-rotations.module.ts
import { Module } from "@nestjs/common";
import { TireRotationsService } from "./tire-rotations.service";
import { TireRotationsController } from "./tire-rotations.controller";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  controllers: [TireRotationsController],
  providers: [TireRotationsService],
  imports: [PrismaModule],
})
export class TireRotationsModule {}
