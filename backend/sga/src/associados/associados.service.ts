import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAssociadoDTO } from './dto/create-associado.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AssociadosService {
  private prisma = new PrismaClient();

  async create(createAssociadoDTO: CreateAssociadoDTO) {
    try {
      const matricula = uuidv4();
      const novoAssociado = await this.prisma.associado.create({
        data: {
          matricula: matricula,
          nome: createAssociadoDTO.nome,
          end_cep: createAssociadoDTO.end_cep,
          end_logradouro: createAssociadoDTO.end_logradouro,
          end_cidade: createAssociadoDTO.end_cidade,
          end_bairro: createAssociadoDTO.end_bairro,
          end_numero: createAssociadoDTO.end_numero,
          end_complemento: createAssociadoDTO.end_complemento,
          cnh: createAssociadoDTO.cnh,
          tipo: createAssociadoDTO.tipo,
        },
      });

      return {
        message: 'Associado criado com sucesso',
        associado: novoAssociado,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar associado',
        error.message,
      );
    }
  }

  async findById(id: string) {
    const associado = await this.prisma.associado.findUnique({
      where: { matricula: id },
    });

    if (!associado) {
      throw new NotFoundException(`Associado com ID ${id} não encontrado`);
    }

    return associado;
  }
}
