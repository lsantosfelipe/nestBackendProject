
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ean` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `idCategory` INTEGER NOT NULL,
    `insDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updDate` DATETIME(3) NOT NULL,
    `insUser` INTEGER NOT NULL,
    `updUser` INTEGER NOT NULL,

    UNIQUE INDEX `Product_ean_key`(`ean`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `AppUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `lastPasswordChange` DATETIME(3) NULL,
    `insDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updDate` DATETIME(3) NOT NULL,
    `insUser` INTEGER NOT NULL,
    `updUser` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `AppUser_username_key`(`username`),
    UNIQUE INDEX `AppUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Product` ADD CONSTRAINT `Product_idCategory_fkey` FOREIGN KEY (`idCategory`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
