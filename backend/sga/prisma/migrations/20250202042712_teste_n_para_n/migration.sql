/*
  Warnings:

  - You are about to drop the column `chassi` on the `evento` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `evento` DROP FOREIGN KEY `Evento_chassi_fkey`;

-- AlterTable
ALTER TABLE `evento` DROP COLUMN `chassi`;

-- CreateTable
CREATE TABLE `EventoVeiculo` (
    `eventoId` INTEGER NOT NULL,
    `chassi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`eventoId`, `chassi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventoVeiculo` ADD CONSTRAINT `EventoVeiculo_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`protocolo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventoVeiculo` ADD CONSTRAINT `EventoVeiculo_chassi_fkey` FOREIGN KEY (`chassi`) REFERENCES `Veiculo`(`chassi`) ON DELETE CASCADE ON UPDATE CASCADE;
