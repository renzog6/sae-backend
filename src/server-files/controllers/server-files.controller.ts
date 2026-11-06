// filepath: sae-backend/src/server-files/controllers/server-files.controller.ts
import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
  Req,
  NotFoundException,
  BadRequestException,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
} from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname, join, isAbsolute } from "path";
import { Response } from "express";
import { existsSync, mkdirSync } from "fs";
import { ServerFilesService } from "../services/server-files.service";
import { AuthenticatedUser } from "../services/server-files.service";
import { StorageFactory } from "../factory/storage.factory";
import { UploadFileDto } from "../dto/upload-file.dto";
import { Roles, Role } from "@common/decorators/roles.decorator";
import {
  ALLOWED_MIME_TYPES,
  ALLOWED_EXTENSIONS,
  MAX_FILE_SIZE_BYTES,
} from "../constants/allowed-file-types";

const TEMP_UPLOAD_DIR = join(process.cwd(), "storage", "uploads", "temp");

// Ensure temp directory exists
if (!existsSync(TEMP_UPLOAD_DIR)) {
  try {
    mkdirSync(TEMP_UPLOAD_DIR, { recursive: true });
  } catch {
    // The upload operation reports a useful error if the directory is unavailable.
  }
}

@ApiTags("server-files")
@Controller("server-files")
export class ServerFilesController {
  constructor(
    private readonly serverFilesService: ServerFilesService,
    private readonly storageFactory: StorageFactory,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Get all server files",
    description:
      "Retrieves a list of all server files with optional filtering by employee or company.",
  })
  @ApiQuery({
    name: "employeeId",
    required: false,
    type: "number",
    description: "Filter files by employee ID",
  })
  @ApiQuery({
    name: "companyId",
    required: false,
    type: "number",
    description: "Filter files by company ID",
  })
  @ApiOkResponse({
    description: "Successfully retrieved the list of files",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              filename: { type: "string" },
              mimetype: { type: "string" },
              size: { type: "number" },
              path: { type: "string" },
              description: { type: "string" },
              employeeId: { type: "number", nullable: true },
              companyId: { type: "number", nullable: true },
              uploadedAt: { type: "string", format: "date-time" },
              isActive: { type: "boolean" },
            },
          },
        },
      },
    },
  })
  async findAll(
    @Req() req: { user: AuthenticatedUser },
    @Query("employeeId") employeeId?: string | string[],
    @Query("companyId") companyId?: string | string[],
  ) {
    const parseOptionalId = (value?: string | string[]) => {
      const rawValue = Array.isArray(value) ? value[0] : value;
      if (rawValue === undefined || rawValue === "") return undefined;

      const parsedValue = Number(rawValue);
      if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
        throw new BadRequestException(
          "El identificador debe ser un entero positivo",
        );
      }

      return parsedValue;
    };

    const filter: any = {};
    const parsedEmployeeId = parseOptionalId(employeeId);
    const parsedCompanyId = parseOptionalId(companyId);
    if (parsedEmployeeId !== undefined) filter.employeeId = parsedEmployeeId;
    if (parsedCompanyId !== undefined) filter.companyId = parsedCompanyId;

    return this.serverFilesService.findAllForUser(filter, req.user);
  }

  @Get("audit")
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "List document audit events",
    description: "Lists administrative document events. Restricted to admins.",
  })
  @ApiOkResponse({ description: "Document audit events" })
  async findDocumentAuditLog(@Req() req: { user: AuthenticatedUser }) {
    return this.serverFilesService.findDocumentAuditLog(req.user);
  }

  @Post("upload")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({
    summary: "Upload a file",
    description:
      "Uploads a file and associates it with an employee or company entity.",
  })
  @ApiBody({
    description: "File upload request",
    type: UploadFileDto,
  })
  @ApiOkResponse({
    description: "File uploaded successfully",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            filename: { type: "string" },
            mimetype: { type: "string" },
            size: { type: "number" },
            path: { type: "string" },
            description: { type: "string" },
            employeeId: { type: "number", nullable: true },
            companyId: { type: "number", nullable: true },
            uploadedAt: { type: "string", format: "date-time" },
            isActive: { type: "boolean" },
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "Invalid file data or unsupported file type",
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: TEMP_UPLOAD_DIR,
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname).toLowerCase());
        },
      }),
      limits: {
        fileSize: MAX_FILE_SIZE_BYTES,
      },
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname || "").toLowerCase();
        const isMimeAllowed = (
          ALLOWED_MIME_TYPES as readonly string[]
        ).includes(file.mimetype);
        const isExtAllowed = (ALLOWED_EXTENSIONS as readonly string[]).includes(
          ext,
        );

        if (!isMimeAllowed || !isExtAllowed) {
          return cb(
            new BadRequestException(
              `Tipo de archivo no permitido: '${file.originalname}' (${file.mimetype}). ` +
                `Formatos permitidos: imágenes (JPG, PNG, WebP, GIF), PDFs y documentos de oficina (Word, Excel, CSV, TXT).`,
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ) {
    if (!file) {
      throw new BadRequestException("El archivo es obligatorio");
    }
    const strategy = this.storageFactory.getStrategy(body.entityType);
    return this.serverFilesService.upload(
      file,
      body.entityId,
      strategy,
      body.description,
    );
  }

  @Get(":id/download")
  @ApiOperation({
    summary: "Download a file",
    description: "Downloads a file by its ID.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the file to download",
  })
  @ApiOkResponse({
    description: "File downloaded successfully",
    schema: {
      type: "string",
      format: "binary",
    },
  })
  @ApiNotFoundResponse({
    description: "File not found with the specified ID",
  })
  async download(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: { user: AuthenticatedUser },
    @Res() res: Response,
  ) {
    // findOneForUser valida que el archivo pertenezca a la empresa del usuario
    const doc = await this.serverFilesService.findOneForUser(id, req.user);
    const filePath = isAbsolute(doc.data.path)
      ? doc.data.path
      : join(process.cwd(), doc.data.path);

    if (!existsSync(filePath)) {
      throw new NotFoundException("File not found");
    }

    return res.download(filePath, doc.data.filename);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Soft-delete a file",
    description:
      "Marks a file as deleted without removing it from physical storage.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the file to delete",
  })
  @ApiOkResponse({ description: "File marked as deleted" })
  @ApiNotFoundResponse({ description: "File not found or already deleted" })
  @ApiForbiddenResponse({
    description: "The user does not have access to the file's company",
  })
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.serverFilesService.softDeleteForUser(id, req.user);
  }
}
