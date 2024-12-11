import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { CreateVeiculoDTO } from './dtos/create-veiculo.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AssociateVeiculoDTO } from './dtos/associate-veiculo.dto';

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
  @Delete('deletar/:id')
  @ApiOperation({ summary: 'Exclui um veículo' })
  @ApiResponse({
    status: 200,
    description: 'Veículo excluído com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado.' })
  async delete(@Param('id') id: string) {
    return await this.veiculosService.delete(id);
  }

  @Get('listar')
  @ApiOperation({ summary: 'Lista todos os veículos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de veículos obtida com sucesso.',
  })
  async findAll() {
    return await this.veiculosService.findAll();
  }

  @Post('associar')
  async associateVeiculoToAssociado(
    @Body() associateVeiculoDto: AssociateVeiculoDTO,
  ) {
    return await this.veiculosService.associateVeiculoToAssociado(
      associateVeiculoDto,
    );
  }

  @Get('associados-veiculos')
  async getAssociadosComVeiculos() {
    return await this.veiculosService.findAllAssociadosComVeiculos();
  }
}
