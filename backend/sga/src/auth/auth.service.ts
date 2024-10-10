import { jwtConstants } from './constants/jwtConstants';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FuncionariosService } from '../funcionarios/funcionarios.service';
import { LoginFuncionarioDTO } from './dto/login/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private funcionariosService: FuncionariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const funcionario = await this.funcionariosService.findByEmail(email);

    if (funcionario && (await bcrypt.compare(senha, funcionario.senha))) {
      const { senha, ...result } = funcionario;
      return result;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(loginFuncionarioDTO: LoginFuncionarioDTO) {
    const funcionario = await this.validateUser(
      loginFuncionarioDTO.email,
      loginFuncionarioDTO.senha,
    );

    const payload = {
      email: funcionario.email,
      sub: funcionario.matriculaFuncionario,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
