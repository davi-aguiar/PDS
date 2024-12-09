import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateIndividuoEnvolvidoDTO {
  @ApiProperty({ description: 'ID do indivíduo envolvido' })
  @IsInt()
  individuos: number;

  @ApiProperty({ description: 'Nome do indivíduo envolvido', required: false })
  @IsString()
  @IsOptional()
  individuo_envolvido?: string;

  @ApiProperty({ description: 'Protocolo associado', required: false })
  @IsInt()
  @IsOptional()
  protocolo?: number;
}
