import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
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
        message: 'Veículo cadastrado com sucesso',
        veiculo: novoVeiculo,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao cadastrar veículo',
        error.message,
      );
    }
  }
}
