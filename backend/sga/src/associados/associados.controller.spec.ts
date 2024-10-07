import { Test, TestingModule } from '@nestjs/testing';
import { AssociadosController } from './associados.controller';

describe('AssociadosController', () => {
  let controller: AssociadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociadosController],
    }).compile();

    controller = module.get<AssociadosController>(AssociadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
