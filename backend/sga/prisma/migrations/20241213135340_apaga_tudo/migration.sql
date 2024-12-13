-- DropForeignKey
ALTER TABLE `associadocadastro` DROP FOREIGN KEY `AssociadoCadastro_chassi_fkey`;

-- AddForeignKey
ALTER TABLE `AssociadoCadastro` ADD CONSTRAINT `AssociadoCadastro_chassi_fkey` FOREIGN KEY (`chassi`) REFERENCES `Veiculo`(`chassi`) ON DELETE CASCADE ON UPDATE CASCADE;
