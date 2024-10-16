// auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants/jwtConstants';
import { FuncionariosService } from '../funcionarios/funcionarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private funcionariosService: FuncionariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // async validate(payload: any) {
  //   const funcionario = await this.funcionariosService.findById(payload.sub);

  //   if (!funcionario) {
  //     throw new UnauthorizedException('Funcionário não encontrado');
  //   }

  //   return funcionario;
  // }
}
