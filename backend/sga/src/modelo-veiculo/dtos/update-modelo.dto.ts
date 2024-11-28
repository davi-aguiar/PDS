import { PartialType } from '@nestjs/swagger';
import { CreateModeloDTO } from './modelo-veiculo.dto';

export class UpdateModeloDTO extends PartialType(CreateModeloDTO) {}
