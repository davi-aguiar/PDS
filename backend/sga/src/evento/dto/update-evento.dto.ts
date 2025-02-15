import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoDto } from './create-evento.dto';

export class UpdateEventoDto extends PartialType(CreateEventoDto) {
  veiculos?: { chassi: string; isTerceiro: boolean }[];
  data_evento?: Date;
  tipo_ocorrencia?: string;
  endereco_evento?: string;
}
