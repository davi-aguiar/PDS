import { PrismaClient, TipoFuncionario } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Inserir funcionário (já existente)
  const funcionario = await prisma.funcionario.upsert({
    where: { email: 'joao.silva@email.com' },
    update: {},
    create: {
      nome: 'João Silva',
      tipo: TipoFuncionario.ATENDIMENTO,
      email: 'joao.silva@email.com',
      senha: 'senha123', // Idealmente, criptografe a senha antes de salvar
    },
  });

  // Inserir novo FuncionarioAtendimento
  const funcionarioAtendimento = await prisma.funcionarioAtendimento.upsert({
    where: { matriculaFuncionario: funcionario.matriculaFuncionario },
    update: {},
    create: {
      matriculaFuncionario: funcionario.matriculaFuncionario,
      rg: '1234567890', // Preencha com o valor desejado para o RG
    },
  });

  const marcas = [
    { codMarca: 1, nomeMarca: 'Toyota' },
    { codMarca: 2, nomeMarca: 'Honda' },
    { codMarca: 3, nomeMarca: 'Ford' },
    { codMarca: 4, nomeMarca: 'Chevrolet' },
    { codMarca: 5, nomeMarca: 'Volkswagen' },
    { codMarca: 6, nomeMarca: 'Hyundai' },
    { codMarca: 7, nomeMarca: 'Nissan' },
    { codMarca: 8, nomeMarca: 'BMW' },
    { codMarca: 9, nomeMarca: 'Mercedes-Benz' },
    { codMarca: 10, nomeMarca: 'Audi' },
  ];

  for (const marca of marcas) {
    await prisma.marca.upsert({
      where: { codMarca: marca.codMarca },
      update: {},
      create: marca,
    });
  }

  console.log('Marcas inseridas com sucesso! 🚗💨');
  console.log('Funcionário e FuncionarioAtendimento inseridos com sucesso! 🚀');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
