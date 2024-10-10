import { Controller, Post, Body } from '@nestjs/common';
import { AssociadosService } from './associados.service';
import { CreateAssociadoDTO } from './dto/create-associado.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('associados')
@Controller('associados')
export class AssociadosController {
  constructor(private readonly associadosService: AssociadosService) {}

  @Post('cadastrar')
  async create(@Body() createAssociadoDto: CreateAssociadoDTO) {
    return await this.associadosService.create(createAssociadoDto);
  }
}
