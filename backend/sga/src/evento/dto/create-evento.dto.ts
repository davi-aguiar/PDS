import { IsDateString, IsInt, IsOptional, IsString, IsArray } from 'class-validator';

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
  matriculaAssociado: string;

  @IsInt()
  matriculaFuncionario: number;

  @IsArray()
  @IsString({ each: true }) // Garante que cada item do array seja uma string
  veiculos: string[]; // Lista de chassis dos veículos
}
