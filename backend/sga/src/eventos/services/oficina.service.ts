import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOficinaDTO } from '../dtos/create-oficina.dto';

@Injectable()
export class OficinaService {
  private prisma = new PrismaClient();

  async create(dto: CreateOficinaDTO) {
    const oficina = await this.prisma.oficina.create({
      data: dto,
    });
    return oficina;
  }

  async findAll() {
    return this.prisma.oficina.findMany();
  }
}
