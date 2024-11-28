import { Test, TestingModule } from '@nestjs/testing';
import { ModeloVeiculoController } from './modelo-veiculo.controller';

describe('ModeloVeiculoController', () => {
  let controller: ModeloVeiculoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModeloVeiculoController],
    }).compile();

    controller = module.get<ModeloVeiculoController>(ModeloVeiculoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
