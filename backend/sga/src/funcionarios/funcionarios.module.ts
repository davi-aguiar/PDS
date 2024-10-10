import { Module } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { FuncionariosController } from './funcionarios.controller';

@Module({
  providers: [FuncionariosService],
  controllers: [FuncionariosController],
  exports: [FuncionariosService],
})
export class FuncionariosModule {}
