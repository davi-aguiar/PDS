// funcionarios/funcionarios.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDTO } from './dto/create-funcionario.dto';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Post('register')
  async register(@Body() createFuncionarioDTO: CreateFuncionarioDTO) {
    return this.funcionariosService.create(createFuncionarioDTO);
  }
}
