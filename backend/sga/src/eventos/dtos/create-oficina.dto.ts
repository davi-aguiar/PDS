import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateOficinaDTO {
  @ApiProperty({ description: 'Oficina credenciada' })
  @IsString()
  oficina_credenciada: string;

  @ApiProperty({ description: 'Peças disponíveis na oficina', required: false })
  @IsString()
  @IsOptional()
  pecas?: string;

  @ApiProperty({
    description: 'Quantidade de veículos atuais na oficina',
    required: false,
  })
  @IsInt()
  @IsOptional()
  qtd_veiculos_atuais?: number;

  @ApiProperty({
    description: 'Matrícula do funcionário associado',
    required: false,
  })
  @IsInt()
  @IsOptional()
  matriculaFuncionario?: number;
}
