-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `preferences` JSON NULL,
    `companyId` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLoginAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    INDEX `users_email_idx`(`email`),
    INDEX `users_username_idx`(`username`),
    INDEX `users_companyId_idx`(`companyId`),
    INDEX `users_deletedAt_idx`(`deletedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cuit` VARCHAR(13) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `businessName` VARCHAR(255) NULL,
    `information` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `businessCategoryId` INTEGER NULL,

    UNIQUE INDEX `companies_cuit_key`(`cuit`),
    INDEX `companies_businessName_idx`(`businessName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `code` VARCHAR(191) NULL,
    `information` VARCHAR(191) NULL,

    UNIQUE INDEX `business_categories_name_key`(`name`),
    UNIQUE INDEX `business_categories_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_subcategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `description` VARCHAR(191) NULL,
    `businessCategoryId` INTEGER NOT NULL,

    UNIQUE INDEX `business_subcategories_businessCategoryId_name_key`(`businessCategoryId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('EMAIL', 'PHONE', 'WHATSAPP', 'TELEGRAM', 'INSTAGRAM', 'LINKEDIN', 'OTHER') NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NULL,
    `information` VARCHAR(191) NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contactId` INTEGER NOT NULL,
    `companyId` INTEGER NULL,
    `personId` INTEGER NULL,

    INDEX `contact_links_companyId_idx`(`companyId`),
    INDEX `contact_links_personId_idx`(`personId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `isoCode` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `countries_name_key`(`name`),
    UNIQUE INDEX `countries_isoCode_key`(`isoCode`),
    INDEX `countries_isoCode_idx`(`isoCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provinces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(25) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `country_id` INTEGER NOT NULL,

    UNIQUE INDEX `provinces_code_key`(`code`),
    INDEX `provinces_country_id_idx`(`country_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `province_id` INTEGER NOT NULL,

    INDEX `cities_province_id_idx`(`province_id`),
    INDEX `cities_postal_code_idx`(`postal_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(191) NULL,
    `number` VARCHAR(191) NULL,
    `floor` VARCHAR(191) NULL,
    `apartment` VARCHAR(191) NULL,
    `latitude` DECIMAL(10, 7) NULL,
    `longitude` DECIMAL(10, 7) NULL,
    `neighborhood` VARCHAR(191) NULL,
    `reference` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `city_id` INTEGER NOT NULL,
    `person_id` INTEGER NULL,
    `company_id` INTEGER NULL,

    UNIQUE INDEX `addresses_person_id_key`(`person_id`),
    INDEX `addresses_city_id_idx`(`city_id`),
    INDEX `addresses_person_id_idx`(`person_id`),
    INDEX `addresses_company_id_idx`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeCode` VARCHAR(191) NULL DEFAULT '00000',
    `information` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'SUSPENDED', 'TERMINATED') NOT NULL DEFAULT 'ACTIVE',
    `hireDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `companyId` INTEGER NULL,
    `categoryId` INTEGER NOT NULL,
    `positionId` INTEGER NOT NULL,
    `personId` INTEGER NOT NULL,

    UNIQUE INDEX `employees_personId_key`(`personId`),
    INDEX `employees_companyId_idx`(`companyId`),
    INDEX `employees_categoryId_idx`(`categoryId`),
    INDEX `employees_positionId_idx`(`positionId`),
    INDEX `employees_companyId_categoryId_idx`(`companyId`, `categoryId`),
    INDEX `employees_companyId_status_idx`(`companyId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `code` VARCHAR(191) NULL,
    `information` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `employee_categories_code_key`(`code`),
    INDEX `employee_categories_name_idx`(`name`),
    INDEX `employee_categories_code_idx`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_positions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `code` VARCHAR(191) NULL,
    `information` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `employee_positions_code_key`(`code`),
    INDEX `employee_positions_name_idx`(`name`),
    INDEX `employee_positions_code_idx`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_vacations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `detail` VARCHAR(191) NULL,
    `days` INTEGER NOT NULL DEFAULT 0,
    `year` INTEGER NOT NULL DEFAULT 0,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `settlementDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` ENUM('ASSIGNED', 'TAKEN') NOT NULL DEFAULT 'TAKEN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `employeeId` INTEGER NOT NULL,

    INDEX `employee_vacations_employeeId_idx`(`employeeId`),
    INDEX `employee_vacations_startDate_idx`(`startDate`),
    INDEX `employee_vacations_endDate_idx`(`endDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `persons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(25) NOT NULL,
    `lastName` VARCHAR(25) NOT NULL,
    `birthDate` DATETIME(3) NULL,
    `dni` VARCHAR(8) NULL,
    `cuil` VARCHAR(13) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    `maritalStatus` ENUM('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED') NULL,
    `information` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `persons_dni_key`(`dni`),
    UNIQUE INDEX `persons_cuil_key`(`cuil`),
    INDEX `persons_lastName_idx`(`lastName`),
    INDEX `persons_firstName_idx`(`firstName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `family_relationships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `relacion` VARCHAR(191) NOT NULL,
    `personId` INTEGER NOT NULL,
    `relativeId` INTEGER NOT NULL,

    INDEX `family_relationships_personId_idx`(`personId`),
    INDEX `family_relationships_relativeId_idx`(`relativeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `mimetype` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `employeeId` INTEGER NULL,
    `companyId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inspections` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` TEXT NULL,
    `observation` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `equipment_id` INTEGER NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `inspection_type_id` INTEGER NULL,

    INDEX `inspections_equipment_id_idx`(`equipment_id`),
    INDEX `inspections_employee_id_idx`(`employee_id`),
    INDEX `inspections_inspection_type_id_idx`(`inspection_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inspection_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `inspection_types_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presentations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `code` VARCHAR(10) NULL,
    `information` VARCHAR(191) NULL,

    UNIQUE INDEX `presentations_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `information` VARCHAR(191) NULL,
    `code` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `brands_name_key`(`name`),
    UNIQUE INDEX `brands_code_key`(`code`),
    INDEX `brands_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `units` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `abbreviation` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `units_abbreviation_key`(`abbreviation`),
    INDEX `units_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `type` ENUM('EMPLOYEE_ILLNESS', 'EMPLOYEE_WARNING', 'EMPLOYEE_ACHIEVEMENT', 'EMPLOYEE_HIRE', 'VACATION_ASSIGNED', 'VACATION_TAKEN', 'COMPANY_REMINDER', 'COMPANY_EVENT', 'EQUIPMENT_MAINTENANCE', 'EQUIPMENT_ACCIDENT', 'EQUIPMENT_REPAIR', 'PERSONAL_EVENT', 'GENERAL_NOTE') NOT NULL,
    `severity` ENUM('INFO', 'WARNING', 'CRITICAL', 'SUCCESS') NOT NULL DEFAULT 'INFO',
    `eventDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `employeeId` INTEGER NULL,
    `companyId` INTEGER NULL,
    `equipmentId` INTEGER NULL,
    `personId` INTEGER NULL,
    `metadata` VARCHAR(191) NULL,

    INDEX `history_logs_employeeId_idx`(`employeeId`),
    INDEX `history_logs_companyId_idx`(`companyId`),
    INDEX `history_logs_equipmentId_idx`(`equipmentId`),
    INDEX `history_logs_personId_idx`(`personId`),
    INDEX `history_logs_type_idx`(`type`),
    INDEX `history_logs_eventDate_idx`(`eventDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_incidents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('SICK_LEAVE', 'DISCIPLINARY', 'WARNING', 'ACCIDENT', 'FAMILY_EMERGENCY', 'UNJUSTIFIED_ABSENCE', 'VACATION_LEAVE') NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `doctorNote` BOOLEAN NOT NULL DEFAULT false,
    `paidLeave` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `employeeId` INTEGER NOT NULL,

    INDEX `employee_incidents_employeeId_idx`(`employeeId`),
    INDEX `employee_incidents_type_idx`(`type`),
    INDEX `employee_incidents_startDate_idx`(`startDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipment_maintenance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('PREVENTIVE', 'CORRECTIVE', 'ACCIDENT_REPAIR', 'ROUTINE_CHECK') NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `cost` DECIMAL(10, 2) NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `technician` VARCHAR(191) NULL,
    `warranty` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `equipmentId` INTEGER NOT NULL,

    INDEX `equipment_maintenance_equipmentId_idx`(`equipmentId`),
    INDEX `equipment_maintenance_type_idx`(`type`),
    INDEX `equipment_maintenance_startDate_idx`(`startDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `internalCode` VARCHAR(191) NULL,
    `name` VARCHAR(50) NULL,
    `description` VARCHAR(191) NULL,
    `observation` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `licensePlate` VARCHAR(191) NULL,
    `chassis` VARCHAR(191) NULL,
    `engine` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `diesel` BOOLEAN NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'RETIRED') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `company_id` INTEGER NULL,
    `category_id` INTEGER NULL,
    `type_id` INTEGER NULL,
    `model_id` INTEGER NULL,

    UNIQUE INDEX `equipment_internalCode_key`(`internalCode`),
    UNIQUE INDEX `equipment_licensePlate_key`(`licensePlate`),
    UNIQUE INDEX `equipment_chassis_key`(`chassis`),
    UNIQUE INDEX `equipment_engine_key`(`engine`),
    INDEX `equipment_company_id_idx`(`company_id`),
    INDEX `equipment_category_id_idx`(`category_id`),
    INDEX `equipment_type_id_idx`(`type_id`),
    INDEX `equipment_model_id_idx`(`model_id`),
    INDEX `equipment_year_idx`(`year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipment_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NULL,
    `name` VARCHAR(25) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `equipment_categories_code_key`(`code`),
    UNIQUE INDEX `equipment_categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipment_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NULL,
    `name` VARCHAR(25) NOT NULL,
    `description` VARCHAR(191) NULL,
    `category_id` INTEGER NULL,

    UNIQUE INDEX `equipment_types_code_key`(`code`),
    INDEX `equipment_types_category_id_idx`(`category_id`),
    UNIQUE INDEX `equipment_types_name_category_id_key`(`name`, `category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipment_models` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NULL,
    `name` VARCHAR(25) NOT NULL,
    `year` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `type_id` INTEGER NULL,
    `brand_id` INTEGER NULL,

    UNIQUE INDEX `equipment_models_code_key`(`code`),
    INDEX `equipment_models_type_id_idx`(`type_id`),
    INDEX `equipment_models_brand_id_idx`(`brand_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NULL,
    `name` VARCHAR(25) NULL,
    `description` VARCHAR(191) NULL,
    `information` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `brandId` INTEGER NULL,
    `categoryId` INTEGER NULL,

    UNIQUE INDEX `parts_code_key`(`code`),
    INDEX `parts_code_idx`(`code`),
    INDEX `parts_name_idx`(`name`),
    INDEX `parts_brandId_idx`(`brandId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `part_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NULL,
    `name` VARCHAR(25) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `part_categories_code_key`(`code`),
    UNIQUE INDEX `part_categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `part_company` (
    `companyId` INTEGER NOT NULL,
    `partId` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NULL,
    `stock` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`companyId`, `partId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `part_equipment_model` (
    `modelId` INTEGER NOT NULL,
    `partId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`modelId`, `partId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `part_equipment` (
    `equipmentId` INTEGER NOT NULL,
    `partId` INTEGER NOT NULL,
    `quantity` INTEGER NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`equipmentId`, `partId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `code` VARCHAR(191) NULL,
    `information` VARCHAR(191) NULL,
    `stockQuantity` INTEGER NULL DEFAULT 0,
    `unitPrice` DECIMAL(10, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `brandId` INTEGER NULL,
    `presentationId` INTEGER NULL,

    UNIQUE INDEX `products_code_key`(`code`),
    INDEX `products_name_idx`(`name`),
    INDEX `products_brandId_idx`(`brandId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_company` (
    `productId` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NULL,
    `stock` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`productId`, `companyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tire_sizes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mainCode` VARCHAR(25) NOT NULL,
    `width` INTEGER NULL,
    `aspectRatio` INTEGER NULL,
    `rimDiameter` DECIMAL(4, 1) NULL,
    `information` VARCHAR(191) NULL,

    UNIQUE INDEX `tire_sizes_mainCode_key`(`mainCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tire_size_aliases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aliasCode` VARCHAR(25) NOT NULL,
    `tireSizeId` INTEGER NOT NULL,

    UNIQUE INDEX `tire_size_aliases_aliasCode_key`(`aliasCode`),
    INDEX `tire_size_aliases_tireSizeId_idx`(`tireSizeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tire_models` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brandId` INTEGER NOT NULL,
    `sizeId` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `construction` VARCHAR(191) NULL,
    `loadIndex` INTEGER NULL,
    `speedSymbol` VARCHAR(191) NULL,
    `plyRating` VARCHAR(191) NULL,
    `treadPattern` VARCHAR(191) NULL,
    `information` VARCHAR(191) NULL,

    INDEX `tire_models_brandId_idx`(`brandId`),
    INDEX `tire_models_sizeId_idx`(`sizeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tires` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serialNumber` VARCHAR(191) NOT NULL,
    `modelId` INTEGER NOT NULL,
    `position` ENUM('DI', 'DD', 'E1I', 'E1D', 'E2I', 'E2D', 'E3I', 'E3D', 'E4I', 'E4D', 'E1II', 'E1ID', 'E1DI', 'E1DD', 'E2II', 'E2ID', 'E2DI', 'E2DD', 'E3II', 'E3ID', 'E3DI', 'E3DD', 'E4II', 'E4ID', 'E4DI', 'E4DD', 'SPARE', 'UNKNOWN') NULL,
    `status` ENUM('IN_STOCK', 'IN_USE', 'UNDER_REPAIR', 'RECAP', 'DISCARDED') NOT NULL DEFAULT 'IN_STOCK',
    `totalKm` INTEGER NULL DEFAULT 0,
    `recapCount` INTEGER NOT NULL DEFAULT 0,
    `lastRecapAt` DATETIME(3) NULL,
    `lastRecapId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tires_serialNumber_key`(`serialNumber`),
    INDEX `tires_modelId_idx`(`modelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tire_assignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tireId` INTEGER NOT NULL,
    `positionConfigId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NULL,
    `kmAtStart` INTEGER NULL,
    `kmAtEnd` INTEGER NULL,

    INDEX `tire_assignments_tireId_idx`(`tireId`),
    INDEX `tire_assignments_positionConfigId_idx`(`positionConfigId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tire_rotations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tireId` INTEGER NOT NULL,
    `fromEquipmentId` INTEGER NULL,
    `toEquipmentId` INTEGER NULL,
    `fromPosition` ENUM('DI', 'DD', 'E1I', 'E1D', 'E2I', 'E2D', 'E3I', 'E3D', 'E4I', 'E4D', 'E1II', 'E1ID', 'E1DI', 'E1DD', 'E2II', 'E2ID', 'E2DI', 'E2DD', 'E3II', 'E3ID', 'E3DI', 'E3DD', 'E4II', 'E4ID', 'E4DI', 'E4DD', 'SPARE', 'UNKNOWN') NULL,
    `toPosition` ENUM('DI', 'DD', 'E1I', 'E1D', 'E2I', 'E2D', 'E3I', 'E3D', 'E4I', 'E4D', 'E1II', 'E1ID', 'E1DI', 'E1DD', 'E2II', 'E2ID', 'E2DI', 'E2DD', 'E3II', 'E3ID', 'E3DI', 'E3DD', 'E4II', 'E4ID', 'E4DI', 'E4DD', 'SPARE', 'UNKNOWN') NULL,
    `rotationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `kmAtRotation` INTEGER NULL,

    INDEX `tire_rotations_tireId_idx`(`tireId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tire_recaps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tireId` INTEGER NOT NULL,
    `provider` VARCHAR(100) NULL,
    `recapDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cost` DECIMAL(10, 2) NULL,
    `notes` VARCHAR(191) NULL,
    `recapNumber` INTEGER NOT NULL DEFAULT 1,
    `kmAtRecap` INTEGER NULL,
    `recapType` VARCHAR(191) NULL,
    `createdBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `tire_recaps_tireId_idx`(`tireId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tire_inspections` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tireId` INTEGER NOT NULL,
    `inspectionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pressure` DECIMAL(5, 2) NULL,
    `treadDepth` DECIMAL(5, 2) NULL,
    `observation` VARCHAR(191) NULL,

    INDEX `tire_inspections_tireId_idx`(`tireId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tire_events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tireId` INTEGER NOT NULL,
    `eventType` ENUM('ASSIGNMENT', 'UNASSIGNMENT', 'ROTATION', 'INSPECTION', 'RECAP', 'DISCARD', 'OTHER') NOT NULL,
    `eventDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `metadata` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `tire_events_tireId_idx`(`tireId`),
    INDEX `tire_events_eventType_idx`(`eventType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipment_axles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `equipmentId` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `axleType` ENUM('FRONT', 'DRIVE', 'TRAILER', 'TAG') NOT NULL,
    `wheelCount` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,

    INDEX `equipment_axles_equipmentId_idx`(`equipmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tire_position_configs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `axleId` INTEGER NOT NULL,
    `positionKey` VARCHAR(191) NOT NULL,
    `side` ENUM('LEFT', 'RIGHT', 'INNER', 'OUTER') NOT NULL,
    `isDual` BOOLEAN NOT NULL DEFAULT false,

    INDEX `tire_position_configs_axleId_idx`(`axleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_businessCategoryId_fkey` FOREIGN KEY (`businessCategoryId`) REFERENCES `business_categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_subcategories` ADD CONSTRAINT `business_subcategories_businessCategoryId_fkey` FOREIGN KEY (`businessCategoryId`) REFERENCES `business_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact_links` ADD CONSTRAINT `contact_links_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `contacts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact_links` ADD CONSTRAINT `contact_links_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact_links` ADD CONSTRAINT `contact_links_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `persons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `provinces` ADD CONSTRAINT `provinces_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `cities_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `persons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `employee_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `employee_positions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `persons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_vacations` ADD CONSTRAINT `employee_vacations_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_relationships` ADD CONSTRAINT `family_relationships_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `persons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_relationships` ADD CONSTRAINT `family_relationships_relativeId_fkey` FOREIGN KEY (`relativeId`) REFERENCES `persons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documents` ADD CONSTRAINT `documents_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documents` ADD CONSTRAINT `documents_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inspections` ADD CONSTRAINT `inspections_equipment_id_fkey` FOREIGN KEY (`equipment_id`) REFERENCES `equipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inspections` ADD CONSTRAINT `inspections_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inspections` ADD CONSTRAINT `inspections_inspection_type_id_fkey` FOREIGN KEY (`inspection_type_id`) REFERENCES `inspection_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history_logs` ADD CONSTRAINT `history_logs_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history_logs` ADD CONSTRAINT `history_logs_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history_logs` ADD CONSTRAINT `history_logs_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `equipment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history_logs` ADD CONSTRAINT `history_logs_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `persons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_incidents` ADD CONSTRAINT `employee_incidents_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipment_maintenance` ADD CONSTRAINT `equipment_maintenance_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `equipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipment` ADD CONSTRAINT `equipment_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipment` ADD CONSTRAINT `equipment_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `equipment_categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipment` ADD CONSTRAINT `equipment_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `equipment_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipment` ADD CONSTRAINT `equipment_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `equipment_models`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipment_types` ADD CONSTRAINT `equipment_types_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `equipment_categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipment_models` ADD CONSTRAINT `equipment_models_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipment_models` ADD CONSTRAINT `equipment_models_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `equipment_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parts` ADD CONSTRAINT `parts_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brands`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parts` ADD CONSTRAINT `parts_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `part_categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `part_company` ADD CONSTRAINT `part_company_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `part_company` ADD CONSTRAINT `part_company_partId_fkey` FOREIGN KEY (`partId`) REFERENCES `parts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `part_equipment_model` ADD CONSTRAINT `part_equipment_model_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `equipment_models`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `part_equipment_model` ADD CONSTRAINT `part_equipment_model_partId_fkey` FOREIGN KEY (`partId`) REFERENCES `parts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `part_equipment` ADD CONSTRAINT `part_equipment_partId_fkey` FOREIGN KEY (`partId`) REFERENCES `parts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `part_equipment` ADD CONSTRAINT `part_equipment_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `equipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brands`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_presentationId_fkey` FOREIGN KEY (`presentationId`) REFERENCES `presentations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_company` ADD CONSTRAINT `product_company_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_company` ADD CONSTRAINT `product_company_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tire_size_aliases` ADD CONSTRAINT `tire_size_aliases_tireSizeId_fkey` FOREIGN KEY (`tireSizeId`) REFERENCES `tire_sizes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tire_models` ADD CONSTRAINT `tire_models_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brands`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tire_models` ADD CONSTRAINT `tire_models_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `tire_sizes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tires` ADD CONSTRAINT `tires_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `tire_models`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tire_assignments` ADD CONSTRAINT `tire_assignments_tireId_fkey` FOREIGN KEY (`tireId`) REFERENCES `tires`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tire_assignments` ADD CONSTRAINT `tire_assignments_positionConfigId_fkey` FOREIGN KEY (`positionConfigId`) REFERENCES `tire_position_configs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tire_rotations` ADD CONSTRAINT `tire_rotations_tireId_fkey` FOREIGN KEY (`tireId`) REFERENCES `tires`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tire_recaps` ADD CONSTRAINT `tire_recaps_tireId_fkey` FOREIGN KEY (`tireId`) REFERENCES `tires`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tire_inspections` ADD CONSTRAINT `tire_inspections_tireId_fkey` FOREIGN KEY (`tireId`) REFERENCES `tires`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tire_events` ADD CONSTRAINT `tire_events_tireId_fkey` FOREIGN KEY (`tireId`) REFERENCES `tires`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipment_axles` ADD CONSTRAINT `equipment_axles_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `equipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tire_position_configs` ADD CONSTRAINT `tire_position_configs_axleId_fkey` FOREIGN KEY (`axleId`) REFERENCES `equipment_axles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

