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

@Controller('modelos')
export class ModelosController {
  constructor(private readonly modelosService: ModelosService) {}

  @Post()
  create(@Body() createModeloDto: CreateModeloDTO) {
    return this.modelosService.create(createModeloDto);
  }

  @Get()
  findAll() {
    return this.modelosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModeloDto: UpdateModeloDTO) {
    return this.modelosService.update(+id, updateModeloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelosService.remove(+id);
  }
}
