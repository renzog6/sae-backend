// filepath: sae-backend/src/documents/documents.controller.ts

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
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { DocumentsService } from "./documents.service";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { extname, join, isAbsolute, basename } from "path";
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

@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  // 📂 Subida de archivos
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        // Use src/uploads to match project structure
        destination: BASE_UPLOAD_DIR,
        filename: (req, file, cb) => {
          // Generar nombre único
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: UploadedDiskFile, @Body() body: any) {
    // Determine target subfolder based on employee or company
    let targetDir = BASE_UPLOAD_DIR;
    let employeeId: number | undefined = body.employeeId ? Number(body.employeeId) : undefined;
    let companyId: number | undefined = body.companyId ? Number(body.companyId) : undefined;

    if (employeeId) {
      const folder = await this.documentsService.getEmployeeFolderName(employeeId);
      targetDir = join(BASE_UPLOAD_DIR, 'employees', folder);
    } else if (companyId) {
      const folder = await this.documentsService.getCompanyFolderName(companyId);
      targetDir = join(BASE_UPLOAD_DIR, 'companies', folder);
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

    // Guardamos metadata en DB con la nueva ruta
    return this.documentsService.create({
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: newPath,
      description: body.description,
      employeeId,
      companyId,
    });
  }

  // 📥 Descargar archivo por ID
  @Get(":id/download")
  async download(@Param("id") id: string, @Res() res: Response) {
    const doc = await this.documentsService.findOne(+id);
    const filePath = isAbsolute(doc.path) ? doc.path : join(process.cwd(), doc.path);
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
  findAll() {
    return this.documentsService.findAll();
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
