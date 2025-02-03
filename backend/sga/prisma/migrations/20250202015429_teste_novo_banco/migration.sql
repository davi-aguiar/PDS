/*
  Warnings:

  - You are about to drop the column `chassi` on the `evento` table. All the data in the column will be lost.
  - You are about to drop the column `matriculaFuncionario` on the `evento` table. All the data in the column will be lost.
  - You are about to drop the `associadocadastro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fisica` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `funcionario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `funcionarioatendimento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `juridica` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cpf_cnpj]` on the table `Associado` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matricula` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `associadocadastro` DROP FOREIGN KEY `AssociadoCadastro_chassi_fkey`;

-- DropForeignKey
ALTER TABLE `associadocadastro` DROP FOREIGN KEY `AssociadoCadastro_matriculaFuncionario_fkey`;

-- DropForeignKey
ALTER TABLE `associadocadastro` DROP FOREIGN KEY `AssociadoCadastro_matricula_fkey`;

-- DropForeignKey
ALTER TABLE `evento` DROP FOREIGN KEY `Evento_chassi_fkey`;

-- DropForeignKey
ALTER TABLE `evento` DROP FOREIGN KEY `Evento_matriculaFuncionario_fkey`;

-- DropForeignKey
ALTER TABLE `fisica` DROP FOREIGN KEY `Fisica_matricula_fkey`;

-- DropForeignKey
ALTER TABLE `funcionarioatendimento` DROP FOREIGN KEY `FuncionarioAtendimento_matriculaFuncionario_fkey`;

-- DropForeignKey
ALTER TABLE `juridica` DROP FOREIGN KEY `Juridica_matricula_fkey`;

-- AlterTable
ALTER TABLE `evento` DROP COLUMN `chassi`,
    DROP COLUMN `matriculaFuncionario`;

-- AlterTable
ALTER TABLE `veiculo` ADD COLUMN `matricula` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `associadocadastro`;

-- DropTable
DROP TABLE `fisica`;

-- DropTable
DROP TABLE `funcionario`;

-- DropTable
DROP TABLE `funcionarioatendimento`;

-- DropTable
DROP TABLE `juridica`;

-- CreateTable
CREATE TABLE `EventoVeiculo` (
    `eventoProtocolo` INTEGER NOT NULL,
    `veiculoChassi` VARCHAR(191) NOT NULL,
    `isPrincipal` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`eventoProtocolo`, `veiculoChassi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Associado_cpf_cnpj_key` ON `Associado`(`cpf_cnpj`);

-- AddForeignKey
ALTER TABLE `Veiculo` ADD CONSTRAINT `Veiculo_matricula_fkey` FOREIGN KEY (`matricula`) REFERENCES `Associado`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventoVeiculo` ADD CONSTRAINT `EventoVeiculo_eventoProtocolo_fkey` FOREIGN KEY (`eventoProtocolo`) REFERENCES `Evento`(`protocolo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventoVeiculo` ADD CONSTRAINT `EventoVeiculo_veiculoChassi_fkey` FOREIGN KEY (`veiculoChassi`) REFERENCES `Veiculo`(`chassi`) ON DELETE CASCADE ON UPDATE CASCADE;
