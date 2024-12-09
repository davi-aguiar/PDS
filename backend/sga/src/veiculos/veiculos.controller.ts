import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { CreateVeiculoDTO } from './dtos/create-veiculo.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculosService) {}

  @Post('register')
  async register(@Body() createVeiculoDTO: CreateVeiculoDTO) {
    return this.veiculosService.create(createVeiculoDTO);
  }

  @Put('atualizar/:id')
  @ApiOperation({ summary: 'Atualiza um veículo' })
  @ApiResponse({
    status: 200,
    description: 'Veículo atualizado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado.' })
  async update(
    @Param('id') id: string,
    @Body() updateVeiculoDto: CreateVeiculoDTO,
  ) {
    return await this.veiculosService.update(id, updateVeiculoDto);
  }
}
