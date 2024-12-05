import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsInt } from 'class-validator';

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
    example: 'Sedan', 
  })
  @IsOptional()
  tipo?: string;

  @ApiProperty({
    description: 'Código da marca associada ao modelo',
    example: 101,
  })
  @IsOptional()
  @IsInt()
  codMarca?: number;
}
