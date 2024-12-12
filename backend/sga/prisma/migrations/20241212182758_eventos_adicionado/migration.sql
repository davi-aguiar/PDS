/*
  Warnings:

  - You are about to drop the `funcionarioeventos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `individuoenvolvido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ocorrencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `oficina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sinistro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `funcionarioeventos` DROP FOREIGN KEY `FuncionarioEventos_matriculaFuncionario_fkey`;

-- DropForeignKey
ALTER TABLE `individuoenvolvido` DROP FOREIGN KEY `IndividuoEnvolvido_protocolo_fkey`;

-- DropForeignKey
ALTER TABLE `ocorrencia` DROP FOREIGN KEY `Ocorrencia_matriculaFuncionario_fkey`;

-- DropForeignKey
ALTER TABLE `oficina` DROP FOREIGN KEY `Oficina_matriculaFuncionario_fkey`;

-- DropForeignKey
ALTER TABLE `sinistro` DROP FOREIGN KEY `Sinistro_chassi_fkey`;

-- DropForeignKey
ALTER TABLE `sinistro` DROP FOREIGN KEY `Sinistro_protocolo_fkey`;

-- DropTable
DROP TABLE `funcionarioeventos`;

-- DropTable
DROP TABLE `individuoenvolvido`;

-- DropTable
DROP TABLE `ocorrencia`;

-- DropTable
DROP TABLE `oficina`;

-- DropTable
DROP TABLE `sinistro`;

-- CreateTable
CREATE TABLE `Evento` (
    `protocolo` INTEGER NOT NULL AUTO_INCREMENT,
    `data_evento` DATETIME(3) NOT NULL,
    `tipo_ocorrencia` VARCHAR(191) NULL,
    `endereco_evento` VARCHAR(191) NULL,
    `chassi` VARCHAR(191) NOT NULL,
    `matriculaAssociado` VARCHAR(191) NOT NULL,
    `matriculaFuncionario` INTEGER NOT NULL,

    PRIMARY KEY (`protocolo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_chassi_fkey` FOREIGN KEY (`chassi`) REFERENCES `Veiculo`(`chassi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_matriculaAssociado_fkey` FOREIGN KEY (`matriculaAssociado`) REFERENCES `Associado`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `Funcionario`(`matriculaFuncionario`) ON DELETE RESTRICT ON UPDATE CASCADE;
