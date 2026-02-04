import { Module } from "@nestjs/common";
import { UnitsService } from "./units.service";
import { UnitsController } from "./units.controller";
import { UnitsResolver } from "./units.resolver";
import { PrismaService } from "@prisma/prisma.service";

@Module({
  controllers: [UnitsController],
  providers: [UnitsService, UnitsResolver, PrismaService],
})
export class UnitsModule { }
