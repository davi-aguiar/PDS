import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsInt } from 'class-validator';
import { TipoVeiculo } from '@prisma/client'; // Importando o enum gerado pelo Prisma

export class CreateModeloDTO {
  @ApiProperty({
    description: 'Código do modelo',
    example: 1,
  })
  @IsInt()
  codModelo: number;

  @ApiProperty({
    description: 'Nome do modelo',
    example: 'Civic',
  })
  @IsOptional()
  nomeModelo?: string;

  @ApiProperty({
    description: 'Tipo do veículo',
    example: 'CARRO', // Deve ser um valor do enum TipoVeiculo
    enum: TipoVeiculo,
  })
  @IsOptional()
  @IsEnum(TipoVeiculo)
  tipo?: TipoVeiculo;

  @ApiProperty({
    description: 'Código da marca associada ao modelo',
    example: 101,
  })
  @IsOptional()
  @IsInt()
  codMarca?: number;
}
