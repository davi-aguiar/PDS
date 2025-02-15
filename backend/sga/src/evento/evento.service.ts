import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class EventoService {
  private prisma = new PrismaClient();

  async create(data: CreateEventoDto) {
    const { veiculos, ...eventoData } = data;

    const evento = await this.prisma.evento.create({
      data: eventoData,
    });

    if (veiculos?.length) {
      await this.prisma.eventoVeiculo.createMany({
        data: veiculos.map(({ chassi, isTerceiro }) => ({
          eventoId: evento.protocolo,
          chassi,
          isTerceiro,
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
    const { veiculos, data_evento, ...eventoData } = data;

    const evento = await this.prisma.evento.update({
      where: { protocolo: id },
      data: {
        ...eventoData,
        data_evento: data_evento ? new Date(data_evento) : undefined,
      },
    });

    if (veiculos) {
      await this.prisma.eventoVeiculo.deleteMany({
        where: { eventoId: id },
      });

      await this.prisma.eventoVeiculo.createMany({
        data: veiculos.map(({ chassi, isTerceiro }) => ({
          eventoId: id,
          chassi,
          isTerceiro,
        })),
      });
    }

    return evento;
  }

  async remove(id: number) {
    // Remove os registros associados em eventoVeiculo
    await this.prisma.eventoVeiculo.deleteMany({
      where: { eventoId: id },
    });

    // Remove o evento
    return this.prisma.evento.delete({
      where: { protocolo: id },
    });
  }
}
