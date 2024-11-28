import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateMarcaDTO } from './dtos/marca.dto';

@Injectable()
export class MarcaService {
  private prisma = new PrismaClient();
  async create(createMarcaDTO: CreateMarcaDTO) {
    const marcaExistente = await this.prisma.marca.findUnique({
      where: { codMarca: createMarcaDTO.codMarca },
    });

    if (marcaExistente) {
      throw new ConflictException('Marca já cadastrada com este código.');
    }

    const novaMarca = await this.prisma.marca.create({
      data: {
        codMarca: createMarcaDTO.codMarca,
        nomeMarca: createMarcaDTO.nomeMarca,
      },
    });

    return {
      message: 'Marca criada com sucesso',
      marca: novaMarca,
    };
  }
}
