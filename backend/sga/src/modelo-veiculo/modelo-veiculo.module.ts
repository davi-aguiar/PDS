import { Module } from '@nestjs/common';
import { ModelosController } from './modelo-veiculo.controller';
import { ModelosService } from './modelo-veiculo.service';

@Module({
  controllers: [ModelosController],
  providers: [ModelosService],
})
export class ModeloVeiculoModule {}
