// filepath: sae-backend/src/modules/documents/controllers/documents.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
  Res,
  NotFoundException,
  BadRequestException,
  Query,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { DocumentsService } from "../services/documents.service";
import { CreateDocumentDto } from "../dto/create-document.dto";
import { UpdateDocumentDto } from "../dto/update-document.dto";
import { UploadDocumentDto } from "../dto/upload-document.dto";
import {
  extname,
  join,
  isAbsolute,
  basename,
  relative as pathRelative,
} from "path";
import { Response } from "express";
import { existsSync, mkdirSync, renameSync } from "fs";

// Minimal type for uploaded file to avoid dependency on Multer typings
type UploadedDiskFile = {
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
};

// Ensure base uploads directory exists
const BASE_UPLOAD_DIR = join(process.cwd(), "src", "uploads");
if (!existsSync(BASE_UPLOAD_DIR)) {
  try {
    mkdirSync(BASE_UPLOAD_DIR, { recursive: true });
  } catch {}
}

@ApiTags("documents")
@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  // 📂 Subida de archivos
  @Post("upload")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description:
      "Subida de archivo asociada a un empleado o una empresa (exactamente uno)",
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
        description: { type: "string" },
        employeeId: { type: "integer", minimum: 1 },
        companyId: { type: "integer", minimum: 1 },
      },
      required: ["file"],
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        // Use src/uploads to match project structure
        destination: BASE_UPLOAD_DIR,
        filename: (req, file, cb) => {
          // Generar nombre único
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
      fileFilter: (req, file, cb) => {
        // Additional validation can be added here if needed
        cb(null, true);
      },
    })
  )
  async uploadFile(
    @UploadedFile() file: UploadedDiskFile,
    @Body() body: UploadDocumentDto
  ) {
    // Determine target subfolder based on employee or company
    let targetDir = BASE_UPLOAD_DIR;
    let employeeId: number | undefined = body.employeeId
      ? Number(body.employeeId)
      : undefined;
    let companyId: number | undefined = body.companyId
      ? Number(body.companyId)
      : undefined;

    // Validation: exactly one of employeeId or companyId must be provided
    const provided = [employeeId !== undefined, companyId !== undefined].filter(
      Boolean
    ).length;
    if (provided !== 1) {
      throw new BadRequestException(
        "Debe especificar exactamente uno: employeeId o companyId"
      );
    }

    if (employeeId) {
      const folder =
        await this.documentsService.getEmployeeFolderName(employeeId);
      targetDir = join(BASE_UPLOAD_DIR, "employees", folder);
    } else if (companyId) {
      const folder =
        await this.documentsService.getCompanyFolderName(companyId);
      targetDir = join(BASE_UPLOAD_DIR, "companies", folder);
    }

    // Ensure target directory exists
    if (!existsSync(targetDir)) {
      try {
        mkdirSync(targetDir, { recursive: true });
      } catch {}
    }

    // Move file into target directory
    const newPath = join(targetDir, basename(file.path));
    try {
      if (file.path !== newPath) {
        renameSync(file.path, newPath);
      }
    } catch {}

    // Compute relative path for portability
    const relativePath = pathRelative(process.cwd(), newPath);

    // Guardamos metadata en DB con la ruta relativa
    return this.documentsService.create({
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: relativePath,
      description: body.description,
      employeeId,
      companyId,
    });
  }

  // 📥 Descargar archivo por ID
  @Get(":id/download")
  async download(@Param("id") id: string, @Res() res: Response) {
    const doc = await this.documentsService.findOne(+id);
    const filePath = isAbsolute(doc.path)
      ? doc.path
      : join(process.cwd(), doc.path);
    if (!existsSync(filePath)) {
      throw new NotFoundException("File not found");
    }
    // Trigger browser download with original filename
    return res.download(filePath, doc.filename);
  }

  // 🔍 CRUD normal
  @Post()
  create(@Body() dto: CreateDocumentDto) {
    return this.documentsService.create(dto);
  }

  @Get()
  findAll(
    @Query("employeeId") employeeId?: string,
    @Query("companyId") companyId?: string
  ) {
    const filter: { employeeId?: number; companyId?: number } = {};
    if (employeeId) filter.employeeId = Number(employeeId);
    if (companyId) filter.companyId = Number(companyId);
    return this.documentsService.findAll(filter);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.documentsService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateDocumentDto) {
    return this.documentsService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.documentsService.remove(+id);
  }
}
