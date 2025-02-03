/*
  Warnings:

  - You are about to drop the column `matricula` on the `veiculo` table. All the data in the column will be lost.
  - You are about to drop the `eventoveiculo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chassi` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matriculaFuncionario` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `eventoveiculo` DROP FOREIGN KEY `EventoVeiculo_eventoProtocolo_fkey`;

-- DropForeignKey
ALTER TABLE `eventoveiculo` DROP FOREIGN KEY `EventoVeiculo_veiculoChassi_fkey`;

-- DropForeignKey
ALTER TABLE `veiculo` DROP FOREIGN KEY `Veiculo_matricula_fkey`;

-- DropIndex
DROP INDEX `Associado_cpf_cnpj_key` ON `associado`;

-- AlterTable
ALTER TABLE `evento` ADD COLUMN `chassi` VARCHAR(191) NOT NULL,
    ADD COLUMN `matriculaFuncionario` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `veiculo` DROP COLUMN `matricula`;

-- DropTable
DROP TABLE `eventoveiculo`;

-- CreateTable
CREATE TABLE `Funcionario` (
    `matriculaFuncionario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `tipo` ENUM('EVENTOS', 'ATENDIMENTO') NULL,
    `email` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Funcionario_email_key`(`email`),
    PRIMARY KEY (`matriculaFuncionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FuncionarioAtendimento` (
    `matriculaFuncionario` INTEGER NOT NULL,
    `rg` VARCHAR(191) NULL,

    PRIMARY KEY (`matriculaFuncionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssociadoCadastro` (
    `matricula` VARCHAR(191) NOT NULL,
    `matriculaFuncionario` INTEGER NOT NULL,
    `chassi` VARCHAR(191) NOT NULL,
    `taxa_adesao` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`matricula`, `matriculaFuncionario`, `chassi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fisica` (
    `matricula` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NULL,

    UNIQUE INDEX `Fisica_cpf_key`(`cpf`),
    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Juridica` (
    `matricula` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NULL,

    UNIQUE INDEX `Juridica_cnpj_key`(`cnpj`),
    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FuncionarioAtendimento` ADD CONSTRAINT `FuncionarioAtendimento_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `Funcionario`(`matriculaFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssociadoCadastro` ADD CONSTRAINT `AssociadoCadastro_matricula_fkey` FOREIGN KEY (`matricula`) REFERENCES `Associado`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssociadoCadastro` ADD CONSTRAINT `AssociadoCadastro_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `FuncionarioAtendimento`(`matriculaFuncionario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssociadoCadastro` ADD CONSTRAINT `AssociadoCadastro_chassi_fkey` FOREIGN KEY (`chassi`) REFERENCES `Veiculo`(`chassi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fisica` ADD CONSTRAINT `Fisica_matricula_fkey` FOREIGN KEY (`matricula`) REFERENCES `Associado`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Juridica` ADD CONSTRAINT `Juridica_matricula_fkey` FOREIGN KEY (`matricula`) REFERENCES `Associado`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_chassi_fkey` FOREIGN KEY (`chassi`) REFERENCES `Veiculo`(`chassi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `Funcionario`(`matriculaFuncionario`) ON DELETE RESTRICT ON UPDATE CASCADE;
