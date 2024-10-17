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

  async create(
    createAssociadoDTO: CreateAssociadoDTO,
    imageFile: Express.Multer.File,
  ) {
    try {
      const matricula = uuidv4();

      let imageBuffer: Buffer | null = null;
      if (imageFile) {
        imageBuffer = imageFile.buffer;
      }

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
          rg: createAssociadoDTO.rg,
          telefone: createAssociadoDTO.telefone,
          data_nascimento: new Date(createAssociadoDTO.data_nascimento),
        },
      });

      return {
        message: 'Associado criado com sucesso',
        associado: novoAssociado,
      };
    } catch (error) {
      console.error('Erro ao criar associado:', error);
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

  async update(id: string, updateAssociadoDTO: CreateAssociadoDTO) {
    try {
      const associado = await this.prisma.associado.update({
        where: { matricula: id },
        data: {
          nome: updateAssociadoDTO.nome,
          end_cep: updateAssociadoDTO.end_cep,
          end_logradouro: updateAssociadoDTO.end_logradouro,
          end_cidade: updateAssociadoDTO.end_cidade,
          end_bairro: updateAssociadoDTO.end_bairro,
          end_numero: updateAssociadoDTO.end_numero,
          end_complemento: updateAssociadoDTO.end_complemento,
          cnh: updateAssociadoDTO.cnh,
          tipo: updateAssociadoDTO.tipo,
        },
      });
      return {
        message: 'Associado atualizado com sucesso',
        associado,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar associado',
        error.message,
      );
    }
  }

  async delete(id: string) {
    try {
      const associado = await this.prisma.associado.delete({
        where: { matricula: id },
      });
      return {
        message: 'Associado deletado com sucesso',
        associado,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar associado',
        error.message,
      );
    }
  }

  async findAll() {
    try {
      const associados = await this.prisma.associado.findMany();

      return {
        message: 'Lista de associados',
        associados,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar associados',
        error.message,
      );
    }
  }
}
