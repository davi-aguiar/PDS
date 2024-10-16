import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { TipoFuncionario } from '@prisma/client';

export class CreateFuncionarioDTO {
  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'João da Silva',
  })
  @IsString()
  nome: string;

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
