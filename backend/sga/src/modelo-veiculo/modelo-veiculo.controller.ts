import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModelosService } from './modelo-veiculo.service';
import { CreateModeloDTO } from './dtos/modelo-veiculo.dto';
import { UpdateModeloDTO } from './dtos/update-modelo.dto';

@Controller('modelo')
export class ModelosController {
  constructor(private readonly modelosService: ModelosService) {}

  @Post('cadastrar')
  create(@Body() createModeloDto: CreateModeloDTO) {
    return this.modelosService.create(createModeloDto);
  }

  @Get('buscar')
  findAll() {
    return this.modelosService.findAll();
  }

  @Get('buscar/:id')
  findOne(@Param('id') id: string) {
    return this.modelosService.findOne(+id);
  }

  @Patch('atualizar/:id')
  update(@Param('id') id: string, @Body() updateModeloDto: UpdateModeloDTO) {
    return this.modelosService.update(+id, updateModeloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelosService.remove(+id);
  }
}
