// filepath: sae-backend/src/server-files/strategies/storage-strategy.interface.ts
export interface StorageStrategy {
    /**
     * Returns the relative destination path for the file (e.g., "employees/lastname_firstname_dni")
     * This path is relative to the base storage/uploads directory.
     */
    getDestinationPath(entityId: number): Promise<string>;

    /**
     * Validates the file before processing (e.g., check mime type, size, etc.)
     * Throws an exception if validation fails.
     */
    validateFile(file: Express.Multer.File): void;

    /**
     * Hook called after the file has been successfully saved and the record created.
     * Useful for updating related entities (e.g., setting profile picture URL).
     */
    onUploadComplete(fileId: number, entityId: number): Promise<void>;

    /**
     * Returns the Prisma relation object for creating the Document record.
     * e.g. { employeeId: 123 } or { companyId: 456 }
     */
    getPrismaRelation(entityId: number): object;
}
