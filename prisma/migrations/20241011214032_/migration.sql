-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_idCategory_fkey`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_idCategory_fkey` FOREIGN KEY (`idCategory`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
