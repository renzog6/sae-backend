// filepath: sae-backend/src/server-files/services/server-files.service.ts
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { StorageStrategy } from "../strategies/storage-strategy.interface";
import { join, basename, relative } from "path";
import {
  existsSync,
  mkdirSync,
  renameSync,
  copyFileSync,
  unlinkSync,
} from "fs";

/** Usuario autenticado tal como lo deja la JwtStrategy en `req.user`. */
export interface AuthenticatedUser {
  id: number;
  role: string;
  companyId?: number;
}

@Injectable()
export class ServerFilesService {
  private readonly BASE_UPLOAD_DIR = join(process.cwd(), "storage", "uploads");

  constructor(private readonly prisma: PrismaService) {}

  async upload(
    file: Express.Multer.File,
    entityId: number,
    strategy: StorageStrategy,
    description?: string
  ) {
    // 1. Validate
    strategy.validateFile(file);

    // 2. Determine destination
    const relativeDestPath = await strategy.getDestinationPath(entityId);
    const fullDestDir = join(this.BASE_UPLOAD_DIR, relativeDestPath);

    // Ensure directory exists
    if (!existsSync(fullDestDir)) {
      mkdirSync(fullDestDir, { recursive: true });
    }

    // 3. Move file
    const filename = basename(file.path); // Assuming Multer generated a unique name
    const fullDestPath = join(fullDestDir, filename);

    try {
      // Try rename first (fastest)
      renameSync(file.path, fullDestPath);
    } catch (error) {
      // Fallback to copy + delete (cross-device)
      try {
        copyFileSync(file.path, fullDestPath);
        unlinkSync(file.path);
      } catch (e) {
        throw new InternalServerErrorException("Failed to move uploaded file");
      }
    }

    // 4. Calculate relative path for DB (storage/uploads/...)
    // We store the path relative to project root or storage root?
    // Previous implementation stored relative to CWD: "src/uploads/..."
    // Let's store "storage/uploads/..."
    const dbPath = relative(process.cwd(), fullDestPath);

    // 5. Create DB Record
    const prismaRelation = strategy.getPrismaRelation(entityId);

    const document = await this.prisma.serverFile.create({
      data: {
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: dbPath,
        description,
        ...prismaRelation,
      },
    });

    // 6. Post-upload hook
    await strategy.onUploadComplete(document.id, entityId);

    return { data: document };
  }

  async findOne(id: number) {
    const document = await this.prisma.serverFile.findUniqueOrThrow({
      where: { id },
    });
    return { data: document };
  }

  /**
   * Empresa dueña de un archivo:
   *  - archivos de empresa: `companyId` directo
   *  - archivos de empleado: la empresa del empleado
   *  - sin relación: `null` (archivo huérfano)
   */
  private async resolveOwnerCompanyId(doc: {
    companyId: number | null;
    employeeId: number | null;
  }): Promise<number | null> {
    if (doc.companyId != null) return doc.companyId;
    if (doc.employeeId != null) {
      const employee = await this.prisma.employee.findUnique({
        where: { id: doc.employeeId },
        select: { companyId: true },
      });
      return employee?.companyId ?? null;
    }
    return null;
  }

  /**
   * Devuelve el archivo sólo si el usuario puede verlo.
   *
   * Cierra el IDOR de `/server-files/:id/download`: antes, con un token válido
   * alcanzaba con enumerar IDs secuenciales para bajar cualquier legajo.
   * ADMIN accede a todo; el resto, sólo a archivos de su propia empresa.
   */
  async findOneForUser(id: number, user: AuthenticatedUser) {
    const { data: doc } = await this.findOne(id);
    if (user.role === "ADMIN") return { data: doc };

    const ownerCompanyId = await this.resolveOwnerCompanyId(doc);
    if (ownerCompanyId == null || ownerCompanyId !== user.companyId) {
      throw new ForbiddenException("No tenés acceso a este archivo");
    }

    return { data: doc };
  }

  async findAll(filter?: { employeeId?: number; companyId?: number }) {
    const where: any = {
      isActive: true,
      deletedAt: null,
    };

    if (filter?.employeeId) {
      where.employeeId = filter.employeeId;
    }

    if (filter?.companyId) {
      where.companyId = filter.companyId;
    }

    const documents = await this.prisma.serverFile.findMany({
      where,
      orderBy: { uploadedAt: "desc" },
    });

    return { data: documents };
  }

  /**
   * Listado acotado al alcance del usuario. Evita que el listado filtre
   * metadata de archivos de otras empresas (mismo problema que el download).
   */
  async findAllForUser(
    filter: { employeeId?: number; companyId?: number } | undefined,
    user: AuthenticatedUser
  ) {
    if (user.role === "ADMIN") return this.findAll(filter);

    if (user.companyId == null) return { data: [] };

    const where: any = {
      isActive: true,
      deletedAt: null,
      // archivo de la empresa, o de un empleado de esa empresa
      OR: [
        { companyId: user.companyId },
        { employee: { companyId: user.companyId } },
      ],
    };

    if (filter?.employeeId) where.employeeId = filter.employeeId;
    if (filter?.companyId) where.companyId = filter.companyId;

    const documents = await this.prisma.serverFile.findMany({
      where,
      orderBy: { uploadedAt: "desc" },
    });

    return { data: documents };
  }
}
