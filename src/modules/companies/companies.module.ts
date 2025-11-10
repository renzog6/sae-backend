import { Module } from "@nestjs/common";
import { CompaniesService } from "./services/companies.service";
import { CompaniesController } from "./controllers/companies.controller";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
