import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventosService: EventoService) {}

  @Post('cadastrar')
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }

  @Get('buscar')
  findAll() {
    return this.eventosService.findAll();
  }

  @Get('buscar/:id')
  findOne(@Param('id') id: string) {
    return this.eventosService.findOne(+id);
  }

  @Patch('atualizar/:id')
  update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventosService.update(+id, updateEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosService.remove(+id);
  }
}
