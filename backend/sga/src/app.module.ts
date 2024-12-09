import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssociadosModule } from './associados/associados.module';
import { AuthModule } from './auth/auth.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { VeiculosModule } from './veiculos/veiculos.module';
import { ModeloVeiculoModule } from './modelo-veiculo/modelo-veiculo.module';
import { ModelosController } from './modelo-veiculo/modelo-veiculo.controller';
import { ModelosService } from './modelo-veiculo/modelo-veiculo.service';
import { MarcaModule } from './marca/marca.module';
import { EventosModule } from './eventos/eventos.module';

@Module({
  imports: [
    AssociadosModule,
    AuthModule,
    FuncionariosModule,
    VeiculosModule,
    ModeloVeiculoModule,
    MarcaModule,
    EventosModule,
  ],
  controllers: [AppController, ModelosController],
  providers: [AppService, ModelosService],
})
export class AppModule {}
