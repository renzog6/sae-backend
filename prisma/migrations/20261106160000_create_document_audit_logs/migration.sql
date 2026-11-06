CREATE TABLE `document_audit_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` ENUM('LOGICAL_DELETE') NOT NULL,
    `serverFileId` INTEGER NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `mimetype` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `employeeId` INTEGER NULL,
    `companyId` INTEGER NULL,
    `eventDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `document_audit_logs_serverFileId_idx`(`serverFileId`),
    INDEX `document_audit_logs_employeeId_idx`(`employeeId`),
    INDEX `document_audit_logs_companyId_idx`(`companyId`),
    INDEX `document_audit_logs_eventDate_idx`(`eventDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
