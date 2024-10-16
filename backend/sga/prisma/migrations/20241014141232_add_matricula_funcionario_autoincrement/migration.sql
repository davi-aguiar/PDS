/*
  Warnings:

  - The primary key for the `associadocadastro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `matriculaFuncionario` on the `associadocadastro` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `funcionario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `matriculaFuncionario` on the `funcionario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `funcionarioatendimento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `matriculaFuncionario` on the `funcionarioatendimento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `funcionarioeventos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `matriculaFuncionario` on the `funcionarioeventos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `matriculaFuncionario` on the `ocorrencia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `matriculaFuncionario` on the `oficina` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `associadocadastro` DROP FOREIGN KEY `AssociadoCadastro_matriculaFuncionario_fkey`;

-- DropForeignKey
ALTER TABLE `funcionarioatendimento` DROP FOREIGN KEY `FuncionarioAtendimento_matriculaFuncionario_fkey`;

-- DropForeignKey
ALTER TABLE `funcionarioeventos` DROP FOREIGN KEY `FuncionarioEventos_matriculaFuncionario_fkey`;

-- DropForeignKey
ALTER TABLE `ocorrencia` DROP FOREIGN KEY `Ocorrencia_matriculaFuncionario_fkey`;

-- DropForeignKey
ALTER TABLE `oficina` DROP FOREIGN KEY `Oficina_matriculaFuncionario_fkey`;

-- AlterTable
ALTER TABLE `associadocadastro` DROP PRIMARY KEY,
    MODIFY `matriculaFuncionario` INTEGER NOT NULL,
    ADD PRIMARY KEY (`matricula`, `matriculaFuncionario`, `chassi`);

-- AlterTable
ALTER TABLE `funcionario` DROP PRIMARY KEY,
    MODIFY `matriculaFuncionario` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`matriculaFuncionario`);

-- AlterTable
ALTER TABLE `funcionarioatendimento` DROP PRIMARY KEY,
    MODIFY `matriculaFuncionario` INTEGER NOT NULL,
    ADD PRIMARY KEY (`matriculaFuncionario`);

-- AlterTable
ALTER TABLE `funcionarioeventos` DROP PRIMARY KEY,
    MODIFY `matriculaFuncionario` INTEGER NOT NULL,
    ADD PRIMARY KEY (`matriculaFuncionario`);

-- AlterTable
ALTER TABLE `ocorrencia` MODIFY `matriculaFuncionario` INTEGER NULL;

-- AlterTable
ALTER TABLE `oficina` MODIFY `matriculaFuncionario` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `FuncionarioAtendimento` ADD CONSTRAINT `FuncionarioAtendimento_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `Funcionario`(`matriculaFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssociadoCadastro` ADD CONSTRAINT `AssociadoCadastro_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `FuncionarioAtendimento`(`matriculaFuncionario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FuncionarioEventos` ADD CONSTRAINT `FuncionarioEventos_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `Funcionario`(`matriculaFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ocorrencia` ADD CONSTRAINT `Ocorrencia_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `FuncionarioEventos`(`matriculaFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oficina` ADD CONSTRAINT `Oficina_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `FuncionarioEventos`(`matriculaFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE;
