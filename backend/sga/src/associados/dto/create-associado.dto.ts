import { ApiProperty } from '@nestjs/swagger';

export class CreateAssociadoDTO {
  @ApiProperty({
    description: 'Matrícula do associado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  matricula: string;

  @ApiProperty({
    description: 'Nome completo do associado',
    example: 'João da Silva',
  })
  nome: string;

  @ApiProperty({
    description: 'CEP do endereço',
    example: '12345-678',
  })
  end_cep: string;

  @ApiProperty({
    description: 'Logradouro do endereço',
    example: 'Rua das Flores',
  })
  end_logradouro: string;

  @ApiProperty({
    description: 'Cidade do endereço',
    example: 'São Paulo',
  })
  end_cidade: string;

  @ApiProperty({
    description: 'Bairro do endereço',
    example: 'Centro',
  })
  end_bairro: string;

  @ApiProperty({
    description: 'Número do endereço',
    example: '1000',
  })
  end_numero: string;

  @ApiProperty({
    description: 'Complemento do endereço (opcional)',
    example: 'Apto 101',
    required: false,
  })
  end_complemento?: string;

  @ApiProperty({
    description: 'Número da CNH (opcional)',
    example: 'AB1234567',
    required: false,
  })
  cnh?: string;

  @ApiProperty({
    description: 'Tipo de associado',
    enum: ['FISICA', 'JURIDICA'],
    example: 'FISICA',
  })
  tipo: 'FISICA' | 'JURIDICA';

  @ApiProperty({
    description: 'Número do RG (opcional)',
    example: '1234567890',
    required: false,
  })
  rg?: string;

  @ApiProperty({
    description: 'Número de telefone',
    example: '(11) 91234-5678',
  })
  telefone: string;

  @ApiProperty({
    description: 'Data de nascimento no formato ISO 8601',
    example: '2000-05-13',
  })
  data_nascimento: string;

  @ApiProperty({
    description: 'Imagem do associado (base64 ou blob)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  imagem?: any;
}
