import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDecimal } from 'class-validator';

export class CreateVeiculoDTO {
  @ApiProperty({
    description: 'Número do chassi do veículo',
    example: '1HGCM82633A123456',
  })
  @IsString()
  chassi: string;

  @ApiProperty({
    description: 'Placa do veículo',
    example: 'ABC-1234',
  })
  @IsOptional()
  @IsString()
  placa?: string;

  @ApiProperty({
    description: 'Número do Renavam do veículo',
    example: '12345678901',
  })
  @IsOptional()
  @IsString()
  esp_renavam?: string;

  @ApiProperty({
    description: 'Cor do veículo',
    example: 'Preto',
  })
  @IsOptional()
  @IsString()
  esp_cor?: string;

  @ApiProperty({
    description: 'Número do motor do veículo',
    example: '12345678ABC',
  })
  @IsOptional()
  @IsString()
  esp_numero_motor?: string;

  @ApiProperty({
    description: 'Código FIPE do veículo',
    example: '001267-0',
  })
  @IsOptional()
  @IsString()
  cod_fipe?: string;

  @ApiProperty({
    description: 'Código do modelo do veículo',
    example: 123,
  })
  @IsOptional()
  codModelo?: number;

  @ApiProperty({
    description: 'Valor da mensalidade associada ao veículo',
    example: 250.75,
  })
  @IsOptional()
  @IsDecimal()
  mensalidade?: number;
}
