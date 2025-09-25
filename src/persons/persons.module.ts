import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { FamilyModule } from './family/family.module';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
  imports: [FamilyModule],
})
export class PersonsModule {}
