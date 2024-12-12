import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class EventoService {
  private prisma = new PrismaClient(); // Instância direta do PrismaClient

  async create(data: CreateEventoDto) {
    return this.prisma.evento.create({
      data,
      include: { veiculo: true, associado: true, funcionario: true },
    });
  }

  async findAll() {
    return this.prisma.evento.findMany({
      include: { veiculo: true, associado: true, funcionario: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.evento.findUnique({
      where: { protocolo: id },
      include: { veiculo: true, associado: true, funcionario: true },
    });
  }

  async update(id: number, data: UpdateEventoDto) {
    return this.prisma.evento.update({
      where: { protocolo: id },
      data,
      include: { veiculo: true, associado: true, funcionario: true },
    });
  }

  async remove(id: number) {
    return this.prisma.evento.delete({ where: { protocolo: id } });
  }
}
