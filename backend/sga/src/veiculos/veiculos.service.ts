import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateVeiculoDTO } from './dtos/create-veiculo.dto';

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
}
