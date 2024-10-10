import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginFuncionarioDTO } from './dto/login/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Realiza login do funcionário' })
  @Post('login')
  async login(@Body() loginFuncionarioDTO: LoginFuncionarioDTO) {
    return this.authService.login(loginFuncionarioDTO);
  }
}
