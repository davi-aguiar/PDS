// funcionarios/funcionarios.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateFuncionarioDTO } from './dto/create-funcionario.dto';

@Injectable()
export class FuncionariosService {
  private prisma = new PrismaClient();

  async create(createFuncionarioDTO: CreateFuncionarioDTO) {
    try {
      const hashedPassword = await bcrypt.hash(createFuncionarioDTO.senha, 10);

      const novoFuncionario = await this.prisma.funcionario.create({
        data: {
          matriculaFuncionario: createFuncionarioDTO.matriculaFuncionario,
          nome: createFuncionarioDTO.nome,
          tipo: createFuncionarioDTO.tipo,
          senha: hashedPassword,
        },
      });

      return {
        message: 'Funcionário criado com sucesso',
        funcionario: novoFuncionario,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar funcionário',
        error.message,
      );
    }
  }

  async findByEmail(email: string) {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { email },
    });

    if (!funcionario) {
      throw new NotFoundException(
        `Funcionário com email ${email} não encontrado`,
      );
    }

    return funcionario;
  }

  async findById(matriculaFuncionario: string) {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { matriculaFuncionario },
    });

    if (!funcionario) {
      throw new NotFoundException(
        `Funcionário com matrícula ${matriculaFuncionario} não encontrado`,
      );
    }

    return funcionario;
  }
}
