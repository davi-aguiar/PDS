-- AlterTable
ALTER TABLE `associado` ADD COLUMN `data_nascimento` DATETIME(3) NULL,
    ADD COLUMN `imagem` LONGBLOB NULL,
    ADD COLUMN `rg` VARCHAR(191) NULL,
    ADD COLUMN `telefone` VARCHAR(191) NULL;
