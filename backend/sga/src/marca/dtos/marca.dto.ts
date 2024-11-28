import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMarcaDTO {
  @ApiProperty({
    description: 'Código da marca',
    example: 101,
  })
  codMarca: number;

  @ApiProperty({
    description: 'Nome da marca',
    example: 'Honda',
  })
  @IsString()
  nomeMarca: string;
}
