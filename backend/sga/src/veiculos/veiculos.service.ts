import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateVeiculoDTO } from './dtos/create-veiculo.dto';
import { AssociateVeiculoDTO } from './dtos/associate-veiculo.dto';

@Injectable()
export class VeiculosService {
  private prisma = new PrismaClient();

  async create(createVeiculoDTO: CreateVeiculoDTO) {
    try {
      const veiculoExistente = await this.prisma.veiculo.findUnique({
        where: { chassi: createVeiculoDTO.chassi },
      });

      if (veiculoExistente) {
        throw new ConflictException('Veículo já cadastrado com este chassi.');
      }

      const modeloExistente = await this.prisma.modelo.findUnique({
        where: { codModelo: createVeiculoDTO.codModelo },
      });

      if (!modeloExistente) {
        throw new NotFoundException(
          `Modelo com código ${createVeiculoDTO.codModelo} não encontrado.`,
        );
      }

      const novoVeiculo = await this.prisma.veiculo.create({
        data: {
          chassi: createVeiculoDTO.chassi,
          placa: createVeiculoDTO.placa,
          esp_renavam: createVeiculoDTO.esp_renavam,
          esp_cor: createVeiculoDTO.esp_cor,
          esp_numero_motor: createVeiculoDTO.esp_numero_motor,
          cod_fipe: createVeiculoDTO.cod_fipe,
          codModelo: createVeiculoDTO.codModelo,
          mensalidade: createVeiculoDTO.mensalidade,
        },
      });

      return {
        message: 'Veículo cadastrado com sucesso.',
        veiculo: novoVeiculo,
      };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Erro ao cadastrar veículo.',
        error.message,
      );
    }
  }

  // editar

  async update(id: string, updateVeiculoDto: CreateVeiculoDTO) {
    try {
      const veiculoExistente = await this.prisma.veiculo.findUnique({
        where: { chassi: id },
      });

      if (!veiculoExistente) {
        throw new NotFoundException('Veículo não encontrado.');
      }

      const veiculoAtualizado = await this.prisma.veiculo.update({
        where: { chassi: id },

        data: {
          placa: updateVeiculoDto.placa,
          esp_renavam: updateVeiculoDto.esp_renavam,
          esp_cor: updateVeiculoDto.esp_cor,
          esp_numero_motor: updateVeiculoDto.esp_numero_motor,
          cod_fipe: updateVeiculoDto.cod_fipe,
          codModelo: updateVeiculoDto.codModelo,
          mensalidade: updateVeiculoDto.mensalidade,
        },
      });
      return {
        message: 'Veículo atualizado com sucesso.',
        veiculo: veiculoAtualizado,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Erro ao atualizar veículo.',
        error.message,
      );
    }
  }

  async delete(id: string) {
    try {
      const veiculoExistente = await this.prisma.veiculo.findUnique({
        where: { chassi: id },
      });

      if (!veiculoExistente) {
        throw new NotFoundException('Veículo não encontrado.');
      }
      await this.prisma.associadoCadastro.deleteMany({
        where: { chassi: id },
      });

      await this.prisma.veiculo.delete({
        where: { chassi: id },
      });

      return {
        message: 'Veículo deletado com sucesso.',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Erro ao deletar veículo.',
        error.message,
      );
    }
  }

  // listar os veiculos

  async findAll() {
    try {
      const veiculos = await this.prisma.veiculo.findMany();
      return {
        message: 'Veículos listados',
        veiculos,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao listar veículos.',
        error.message,
      );
    }
  }

  // refatorar no futuro
  async associateVeiculoToAssociado(data: AssociateVeiculoDTO) {
    const { matricula, chassi, matriculaFuncionario, taxaAdesao } = data;

    const associado = await this.prisma.associado.findUnique({
      where: { matricula: matricula },
    });

    if (!associado) {
      throw new NotFoundException('Associado não encontrado.');
    }

    const veiculo = await this.prisma.veiculo.findUnique({
      where: { chassi },
    });
    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado.');
    }

    const vinculoExistente = await this.prisma.associadoCadastro.findUnique({
      where: {
        matricula_matriculaFuncionario_chassi: {
          matricula,
          chassi,
          matriculaFuncionario,
        },
      },
    });
    if (vinculoExistente) {
      throw new ConflictException(
        'Este veículo já está associado a este associado.',
      );
    }

    const associadoCadastro = await this.prisma.associadoCadastro.create({
      data: {
        matricula,
        chassi,
        matriculaFuncionario,
        taxa_adesao: taxaAdesao,
      },
    });

    return {
      message: 'Veículo associado ao associado com sucesso.',
      associadoCadastro,
    };
  }

  // tem um jeito melhor de fazer isso não?
  async findAllAssociadosComVeiculos() {
    try {
      const associados = await this.prisma.associado.findMany({
        include: {
          associadocadastros: {
            include: {
              veiculo: true,
            },
          },
        },
      });

      const resultado = associados.map((associado) => ({
        matricula: associado.matricula,
        nome: associado.nome,
        veiculos: associado.associadocadastros.map((cadastro) => ({
          chassi: cadastro.veiculo.chassi,
          placa: cadastro.veiculo.placa,
          cor: cadastro.veiculo.esp_cor,
          modelo: cadastro.veiculo.codModelo,
        })),
      }));

      return {
        message: 'Associados e veículos listados com sucesso.',
        associados: resultado,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao listar associados e veículos.',
        error.message,
      );
    }
  }

  //caso tu precise só do veiculo cria o endpoint dps
  async findOneVeiculo(id: string) {
    try {
      const veiculo = await this.prisma.veiculo.findUnique({
        where: { chassi: id },
      });
      if (!veiculo) {
        throw new NotFoundException('Veículo não encontrado.');
      }
      return {
        message: 'Veículo encontrado com sucesso.',
        veiculo,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Erro ao buscar veículo.',
        error.message,
      );
    }
  }

  async findOne(id: string) {
    try {
      const veiculo = await this.prisma.veiculo.findUnique({
        where: { chassi: id },
        include: {
          associadocadastros: {
            include: {
              associado: true,
            },
          },
        },
      });

      if (!veiculo) {
        throw new NotFoundException('Veículo não encontrado.');
      }

      const associadoVinculado = veiculo.associadocadastros.map((vinculo) => ({
        matricula: vinculo.associado.matricula,
        nome: vinculo.associado.nome,
        cpf_cnpj: vinculo.associado.cpf_cnpj,
      }));

      return {
        message: 'Veículo encontrado com sucesso.',
        veiculo: {
          chassi: veiculo.chassi,
          placa: veiculo.placa,
          esp_renavam: veiculo.esp_renavam,
          esp_cor: veiculo.esp_cor,
          esp_numero_motor: veiculo.esp_numero_motor,
          cod_fipe: veiculo.cod_fipe,
          codModelo: veiculo.codModelo,
          mensalidade: veiculo.mensalidade,
          associado: associadoVinculado,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Erro ao buscar veículo.',
        error.message,
      );
    }
  }
}
