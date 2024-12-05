import { Controller, Post, Body, Get } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDTO } from './dtos/marca.dto';

@Controller('marcas')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @Post()
  async create(@Body() createMarcaDTO: CreateMarcaDTO) {
    return this.marcaService.create(createMarcaDTO);
  }

  @Get('buscar')
  findAll() {
    return this.marcaService.findAll();
  }
}
