// filepath: sae-backend/src/modules/validators/validators.controller.ts
import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ValidatorsService } from "./validators.service";
import { UniqueValidatorDto } from "./dto/unique-validator.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("Validators")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("validators")
export class ValidatorsController {
  constructor(private readonly service: ValidatorsService) {}

  @Get("unique")
  @ApiOperation({ summary: "Generic unique field validator" })
  @ApiResponse({
    status: 200,
    description: "Uniqueness validation result",
    schema: {
      type: "object",
      properties: {
        exists: {
          type: "boolean",
          description:
            "True if the value is unique, false if it already exists",
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - invalid parameters or validation not allowed",
  })
  async unique(@Query() dto: UniqueValidatorDto) {
    return this.service.checkUnique(dto);
  }
}
