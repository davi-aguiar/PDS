-- CreateTable
CREATE TABLE `Associado` (
    `matricula` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NULL,
    `end_cep` VARCHAR(191) NULL,
    `end_logradouro` VARCHAR(191) NULL,
    `end_cidade` VARCHAR(191) NULL,
    `end_bairro` VARCHAR(191) NULL,
    `end_numero` VARCHAR(191) NULL,
    `end_complemento` VARCHAR(191) NULL,
    `cnh` VARCHAR(191) NULL,
    `tipo` ENUM('FISICA', 'JURIDICA') NULL,

    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcionario` (
    `matriculaFuncionario` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NULL,
    `tipo` ENUM('EVENTOS', 'ATENDIMENTO') NULL,

    PRIMARY KEY (`matriculaFuncionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FuncionarioAtendimento` (
    `matriculaFuncionario` VARCHAR(191) NOT NULL,
    `rg` VARCHAR(191) NULL,

    PRIMARY KEY (`matriculaFuncionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Marca` (
    `codMarca` INTEGER NOT NULL,
    `nomeMarca` VARCHAR(191) NULL,

    PRIMARY KEY (`codMarca`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Modelo` (
    `codModelo` INTEGER NOT NULL,
    `nomeModelo` VARCHAR(191) NULL,
    `tipo` ENUM('CARRO', 'MOTO', 'CAMINHAO') NULL,
    `codMarca` INTEGER NULL,

    PRIMARY KEY (`codModelo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Veiculo` (
    `chassi` VARCHAR(191) NOT NULL,
    `placa` VARCHAR(191) NULL,
    `esp_renavam` VARCHAR(191) NULL,
    `esp_cor` VARCHAR(191) NULL,
    `esp_numero_motor` VARCHAR(191) NULL,
    `cod_fipe` VARCHAR(191) NULL,
    `codModelo` INTEGER NULL,
    `mensalidade` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`chassi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssociadoCadastro` (
    `matricula` VARCHAR(191) NOT NULL,
    `matriculaFuncionario` VARCHAR(191) NOT NULL,
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

-- CreateTable
CREATE TABLE `FuncionarioEventos` (
    `matriculaFuncionario` VARCHAR(191) NOT NULL,
    `cnh` VARCHAR(191) NULL,

    PRIMARY KEY (`matriculaFuncionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ocorrencia` (
    `protocolo` INTEGER NOT NULL,
    `tipo_ocorrencia` VARCHAR(191) NULL,
    `endereco_atual` VARCHAR(191) NULL,
    `matriculaFuncionario` VARCHAR(191) NULL,
    `participacao` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`protocolo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IndividuoEnvolvido` (
    `individuos` INTEGER NOT NULL,
    `individuo_envolvido` VARCHAR(191) NULL,
    `protocolo` INTEGER NULL,

    PRIMARY KEY (`individuos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Oficina` (
    `oficina_credenciada` VARCHAR(191) NOT NULL,
    `pecas` VARCHAR(191) NULL,
    `qtd_veiculos_atuais` INTEGER NULL,
    `matriculaFuncionario` VARCHAR(191) NULL,

    PRIMARY KEY (`oficina_credenciada`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sinistro` (
    `chassi` VARCHAR(191) NOT NULL,
    `protocolo` INTEGER NOT NULL,
    `dia` INTEGER NULL,
    `mes` INTEGER NULL,
    `ano` INTEGER NULL,

    PRIMARY KEY (`chassi`, `protocolo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FuncionarioAtendimento` ADD CONSTRAINT `FuncionarioAtendimento_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `Funcionario`(`matriculaFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Modelo` ADD CONSTRAINT `Modelo_codMarca_fkey` FOREIGN KEY (`codMarca`) REFERENCES `Marca`(`codMarca`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Veiculo` ADD CONSTRAINT `Veiculo_codModelo_fkey` FOREIGN KEY (`codModelo`) REFERENCES `Modelo`(`codModelo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssociadoCadastro` ADD CONSTRAINT `AssociadoCadastro_matricula_fkey` FOREIGN KEY (`matricula`) REFERENCES `Associado`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssociadoCadastro` ADD CONSTRAINT `AssociadoCadastro_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `FuncionarioAtendimento`(`matriculaFuncionario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssociadoCadastro` ADD CONSTRAINT `AssociadoCadastro_chassi_fkey` FOREIGN KEY (`chassi`) REFERENCES `Veiculo`(`chassi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fisica` ADD CONSTRAINT `Fisica_matricula_fkey` FOREIGN KEY (`matricula`) REFERENCES `Associado`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Juridica` ADD CONSTRAINT `Juridica_matricula_fkey` FOREIGN KEY (`matricula`) REFERENCES `Associado`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FuncionarioEventos` ADD CONSTRAINT `FuncionarioEventos_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `Funcionario`(`matriculaFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ocorrencia` ADD CONSTRAINT `Ocorrencia_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `FuncionarioEventos`(`matriculaFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IndividuoEnvolvido` ADD CONSTRAINT `IndividuoEnvolvido_protocolo_fkey` FOREIGN KEY (`protocolo`) REFERENCES `Ocorrencia`(`protocolo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oficina` ADD CONSTRAINT `Oficina_matriculaFuncionario_fkey` FOREIGN KEY (`matriculaFuncionario`) REFERENCES `FuncionarioEventos`(`matriculaFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sinistro` ADD CONSTRAINT `Sinistro_chassi_fkey` FOREIGN KEY (`chassi`) REFERENCES `Veiculo`(`chassi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sinistro` ADD CONSTRAINT `Sinistro_protocolo_fkey` FOREIGN KEY (`protocolo`) REFERENCES `Ocorrencia`(`protocolo`) ON DELETE RESTRICT ON UPDATE CASCADE;
