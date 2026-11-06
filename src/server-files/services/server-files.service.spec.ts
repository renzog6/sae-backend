import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { ServerFilesService } from "./server-files.service";

describe("ServerFilesService soft delete", () => {
  const document = {
    id: 99,
    filename: "legajo.pdf",
    mimetype: "application/pdf",
    size: 123,
    path: "storage/uploads/employee/5/legajo.pdf",
    description: null,
    employeeId: 5,
    companyId: null,
    isActive: true,
    deletedAt: null,
  };

  let prisma: any;
  let service: ServerFilesService;

  beforeEach(() => {
    const tx = {
      serverFile: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      documentAuditLog: {
        create: jest.fn().mockResolvedValue({ id: 123 }),
        findMany: jest.fn().mockResolvedValue([]),
      },
    };

    prisma = {
      serverFile: {
        findUniqueOrThrow: jest.fn().mockResolvedValue(document),
      },
      documentAuditLog: {
        findMany: jest.fn().mockResolvedValue([]),
      },
      employee: {
        findUnique: jest.fn().mockResolvedValue({ companyId: 2 }),
      },
      $transaction: jest.fn((callback) => callback(tx)),
      tx,
    };
    service = new ServerFilesService(prisma as PrismaService);
  });

  it("soft-deletes the record and creates an employee document audit event without actor data", async () => {
    await expect(
      service.softDeleteForUser(99, {
        id: 10,
        role: "USER",
        companyId: 2,
      }),
    ).resolves.toEqual({ message: "File marked as deleted" });

    expect(prisma.tx.serverFile.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 99, isActive: true, deletedAt: null },
        data: expect.objectContaining({
          isActive: false,
          deletedAt: expect.any(Date),
        }),
      }),
    );

    const auditData = prisma.tx.documentAuditLog.create.mock.calls[0][0].data;
    expect(auditData).toEqual(
      expect.objectContaining({
        action: "LOGICAL_DELETE",
        serverFileId: 99,
        filename: "legajo.pdf",
        employeeId: 5,
        eventDate: expect.any(Date),
      }),
    );
    expect(auditData).not.toHaveProperty("userId");
    expect(auditData).not.toHaveProperty("actorUserId");
  });

  it("rejects deletion by a user from another company", async () => {
    await expect(
      service.softDeleteForUser(99, {
        id: 11,
        role: "USER",
        companyId: 1,
      }),
    ).rejects.toBeInstanceOf(ForbiddenException);

    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("does not allow downloading a soft-deleted file", async () => {
    prisma.serverFile.findUniqueOrThrow.mockResolvedValue({
      ...document,
      isActive: false,
      deletedAt: new Date(),
    });

    await expect(
      service.findOneForUser(99, { id: 12, role: "ADMIN" }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it("does not create another history event if the file was concurrently deleted", async () => {
    prisma.tx.serverFile.updateMany.mockResolvedValue({ count: 0 });

    await expect(
      service.softDeleteForUser(99, {
        id: 10,
        role: "USER",
        companyId: 2,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(prisma.tx.documentAuditLog.create).not.toHaveBeenCalled();
  });

  it("restricts document audit log access to admins", async () => {
    await expect(
      service.findDocumentAuditLog({
        id: 10,
        role: "USER",
        companyId: 2,
      }),
    ).rejects.toBeInstanceOf(ForbiddenException);

    await expect(
      service.findDocumentAuditLog({ id: 12, role: "ADMIN" }),
    ).resolves.toEqual([]);
    expect(prisma.documentAuditLog.findMany).toHaveBeenCalledWith({
      orderBy: { eventDate: "desc" },
    });
  });
});
