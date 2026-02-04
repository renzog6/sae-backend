import { Module, Global } from "@nestjs/common";
import { GraphQLJSON } from "./json.scalar";

@Global()
@Module({
  providers: [GraphQLJSON],
  exports: [GraphQLJSON],
})
export class ScalarsModule {}
