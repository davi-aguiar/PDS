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
}
