/*
  Warnings:

  - Made the column `tipo` on table `modelo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `modelo` MODIFY `tipo` ENUM('CARRO', 'MOTO', 'CAMINHAO') NOT NULL;
