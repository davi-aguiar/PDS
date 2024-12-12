import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateEventoDto {
  @IsDateString()
  data_evento: string;

  @IsString()
  @IsOptional()
  tipo_ocorrencia?: string;

  @IsString()
  @IsOptional()
  endereco_evento?: string;

  @IsString()
  chassi: string;

  @IsString()
  matriculaAssociado: string;

  @IsInt()
  matriculaFuncionario: number;
}
