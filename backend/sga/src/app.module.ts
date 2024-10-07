import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssociadosModule } from './associados/associados.module';

@Module({
  imports: [AssociadosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
