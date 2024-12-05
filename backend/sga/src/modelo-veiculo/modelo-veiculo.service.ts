import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from 'nestjs-prisma';
import { PrismaClient } from '@prisma/client';
import { CreateModeloDTO } from './dtos/modelo-veiculo.dto';
import { UpdateModeloDTO } from './dtos/update-modelo.dto';

@Injectable()
export class ModelosService {
  private prisma = new PrismaClient();

  async create(data: CreateModeloDTO) {
    try {
      
      console.log(data);
      return this.prisma.modelo.create({
        data: {
          codModelo: data.codModelo,
          nomeModelo: data.nomeModelo,
          tipo: data.tipo,
          codMarca: data.codMarca,
        },
      });
    } catch (error) {
      console.log(error)
    }
    
  }

  async findAll() {
    return this.prisma.modelo.findMany({
      include: { marca: true },
    });
  }

  async findOne(id: number) {
    const modelo = await this.prisma.modelo.findUnique({
      where: { codModelo: id },
      include: { marca: true },
    });

    if (!modelo) {
      throw new NotFoundException(`Modelo com ID ${id} não encontrado`);
    }
    return modelo;
  }

  async update(id: number, data: UpdateModeloDTO) {
    return this.prisma.modelo.update({
      where: { codModelo: id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.modelo.delete({
      where: { codModelo: id },
    });
  }
}
