import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateSinistroDTO {
  @ApiProperty({ description: 'Chassi do veículo' })
  @IsString()
  chassi: string;

  @ApiProperty({ description: 'Número do protocolo' })
  @IsInt()
  protocolo: number;

  @ApiProperty({ description: 'Dia do sinistro', required: false })
  @IsInt()
  @IsOptional()
  dia?: number;

  @ApiProperty({ description: 'Mês do sinistro', required: false })
  @IsInt()
  @IsOptional()
  mes?: number;

  @ApiProperty({ description: 'Ano do sinistro', required: false })
  @IsInt()
  @IsOptional()
  ano?: number;
}
