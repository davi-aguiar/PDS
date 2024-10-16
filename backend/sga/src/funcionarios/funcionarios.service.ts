// funcionarios/funcionarios.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateFuncionarioDTO } from './dto/create-funcionario.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FuncionariosService {
  findById(sub: any) {
    throw new Error('Method not implemented.');
  }
  private prisma = new PrismaClient();

  async create(createFuncionarioDTO: CreateFuncionarioDTO) {
    try {
      const funcionarioExistente = await this.prisma.funcionario.findUnique({
        where: { email: createFuncionarioDTO.email },
      });

      if (funcionarioExistente) {
        throw new ConflictException('E-mail já cadastrado.');
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createFuncionarioDTO.senha,
        saltRounds,
      );

      const novoFuncionario = await this.prisma.funcionario.create({
        data: {
          nome: createFuncionarioDTO.nome,
          email: createFuncionarioDTO.email,
          senha: hashedPassword,
        },
      });

      return {
        message: 'Funcionário criado com sucesso',
        funcionario: novoFuncionario,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Funcionário com este e-mail já existe.');
      }

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
}
