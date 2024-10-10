import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginFuncionarioDTO {
  @ApiProperty({
    description: 'Email do funcionário para login',
    example: 'joao.silva@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do funcionário',
    example: 'senhaSegura123',
  })
  @IsString()
  senha: string;
}
