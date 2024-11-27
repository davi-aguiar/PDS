import { Controller, Post, Body } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { CreateVeiculoDTO } from './dtos/create-veiculo.dto';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculosService) {}

  @Post('register')
  async register(@Body() createVeiculoDTO: CreateVeiculoDTO) {
    return this.veiculosService.create(createVeiculoDTO);
  }
}
