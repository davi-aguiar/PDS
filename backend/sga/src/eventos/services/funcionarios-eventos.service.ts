import { UpdateFuncionarioEventosDTO } from './../dtos/update-funcionario-eventos.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateFuncionarioEventosDTO } from '../dtos/create-funcionario-eventos.dto';

@Injectable()
export class FuncionarioEventosService {
  private prisma = new PrismaClient();

  async create(dto: CreateFuncionarioEventosDTO) {
    const funcionario = await this.prisma.funcionario.create({
      data: {
        matriculaFuncionario: dto.matriculaFuncionario,
      },
    });
    return funcionario;
  }

  async update(matriculaFuncionario: number, dto: UpdateFuncionarioEventosDTO) {
    const funcionario = await this.prisma.funcionarioEventos.update({
      where: { matriculaFuncionario },
      data: dto,
    });
    return funcionario;
  }

  async findAll() {
    return this.prisma.funcionarioEventos.findMany();
  }

  async findOne(matriculaFuncionario: number) {
    const funcionario = await this.prisma.funcionarioEventos.findUnique({
      where: { matriculaFuncionario },
    });
    if (!funcionario) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    return funcionario;
  }
}
