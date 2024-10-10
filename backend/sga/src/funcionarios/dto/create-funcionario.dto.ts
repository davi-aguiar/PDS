import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { TipoFuncionario } from '@prisma/client';

export class CreateFuncionarioDTO {
  @ApiProperty({
    description: 'Matrícula do funcionário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  matriculaFuncionario: string;

  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'João da Silva',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Tipo do funcionário (EVENTOS ou ATENDIMENTO)',
    example: 'EVENTOS',
  })
  @IsEnum(TipoFuncionario)
  tipo: TipoFuncionario;

  @ApiProperty({
    description: 'Email do funcionário para login',
    example: 'joao.silva@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha para o login do funcionário',
    example: 'senhaSegura123',
  })
  @IsString()
  senha: string;
}
