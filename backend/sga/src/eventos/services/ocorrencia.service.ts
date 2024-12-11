// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { CreateOcorrenciaDTO } from '../dtos/create-ocorrencia.dto';
// import { UpdateOcorrenciaDTO } from '../dtos/update-ocorrencia.dto';

// @Injectable()
// export class OcorrenciaService {
//   private prisma = new PrismaClient();

//   async create(dto: CreateOcorrenciaDTO) {
//     const ocorrencia = await this.prisma.ocorrencia.create({
//       data: dto,
//     });
//     return ocorrencia;
//   }

//   async update(protocolo: number, dto: UpdateOcorrenciaDTO) {
//     const ocorrencia = await this.prisma.ocorrencia.update({
//       where: { protocolo },
//       data: dto,
//     });
//     return ocorrencia;
//   }

//   async findAll() {
//     return this.prisma.ocorrencia.findMany();
//   }

//   async findOne(protocolo: number) {
//     const ocorrencia = await this.prisma.ocorrencia.findUnique({
//       where: { protocolo },
//     });
//     if (!ocorrencia) {
//       throw new NotFoundException('Ocorrência não encontrada');
//     }
//     return ocorrencia;
//   }
// }
