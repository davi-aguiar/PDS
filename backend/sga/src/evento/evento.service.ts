import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class EventoService {
  private prisma = new PrismaClient();

  async create(data: CreateEventoDto) {
  
    const { veiculos, ...eventoData } = data;
  
    // Criar evento SEM o campo chassi
    const evento = await this.prisma.evento.create({
      data: eventoData, // Aqui não deve incluir o campo 'chassi'
    });
  
    // Criar relacionamentos na tabela eventoVeiculo
    if (veiculos?.length) {
      await this.prisma.eventoVeiculo.createMany({
        data: veiculos.map((chassi) => ({
          eventoId: evento.protocolo, // Usando a chave primária do evento
          chassi,
        })),
      });
    }
  
    return evento;
  }

  async findAll() {
    return this.prisma.evento.findMany({
      include: {
        veiculos: {
          include: { veiculo: true },
        },
        associado: true,
        funcionario: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.evento.findUnique({
      where: { protocolo: id },
      include: {
        veiculos: {
          include: { veiculo: true },
        },
        associado: true,
        funcionario: true,
      },
    });
  }

  async update(id: number, data: UpdateEventoDto) {
    const { veiculos, ...eventoData } = data;

    const evento = await this.prisma.evento.update({
      where: { protocolo: id },
      data: eventoData,
    });

    if (veiculos) {
      await this.prisma.eventoVeiculo.deleteMany({
        where: { eventoId: id },
      });

      await this.prisma.eventoVeiculo.createMany({
        data: veiculos.map((chassi) => ({
          eventoId: id,
          chassi,
        })),
      });
    }

    return evento;
  }

  async remove(id: number) {
    await this.prisma.eventoVeiculo.deleteMany({
      where: { eventoId: id },
    });

    return this.prisma.evento.delete({
      where: { protocolo: id },
    });
  }
}