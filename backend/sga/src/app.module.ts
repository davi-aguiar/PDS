import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssociadosModule } from './associados/associados.module';
import { AuthModule } from './auth/auth.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';

@Module({
  imports: [AssociadosModule, AuthModule, FuncionariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
