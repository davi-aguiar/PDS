import { Test, TestingModule } from '@nestjs/testing';
import { AssociadosService } from './associados.service';

describe('AssociadosService', () => {
  let service: AssociadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociadosService],
    }).compile();

    service = module.get<AssociadosService>(AssociadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
