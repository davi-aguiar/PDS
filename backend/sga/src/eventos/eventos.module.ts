import { Module } from '@nestjs/common';
import { EventosController } from './eventos.controller';
// import { EventosService } from './services/ocorrencia.service';

@Module({
  controllers: [EventosController],
  // providers: [EventosService],
})
export class EventosModule {}
