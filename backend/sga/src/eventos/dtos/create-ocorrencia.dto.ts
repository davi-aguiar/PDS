import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsDecimal } from 'class-validator';

export class CreateOcorrenciaDTO {
  @ApiProperty({ description: 'Tipo de ocorrência', required: false })
  @IsString()
  @IsOptional()
  tipo_ocorrencia?: string;

  @ApiProperty({ description: 'Endereço atual', required: false })
  @IsString()
  @IsOptional()
  endereco_atual?: string;

  @ApiProperty({
    description: 'Matrícula do funcionário associado',
    required: false,
  })
  @IsInt()
  @IsOptional()
  matriculaFuncionario?: number;

  @ApiProperty({
    description: 'Participação percentual do funcionário',
    required: false,
  })
  @IsDecimal()
  @IsOptional()
  participacao?: number;
}
