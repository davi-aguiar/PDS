import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateIndividuoEnvolvidoDTO } from '../dtos/create-individuo-envolvido.dto';

@Injectable()
export class IndividuoEnvolvidoService {
  private prisma = new PrismaClient();

  async create(dto: CreateIndividuoEnvolvidoDTO) {
    const individuo = await this.prisma.individuoEnvolvido.create({
      data: dto,
    });
    return individuo;
  }

  async findAll() {
    return this.prisma.individuoEnvolvido.findMany();
  }
}
