export class CreateAssociadoDTO {
  matricula: string;
  nome: string;
  end_cep: string;
  end_logradouro: string;
  end_cidade: string;
  end_bairro: string;
  end_numero: string;
  end_complemento?: string;
  cnh?: string;
  tipo: 'FISICA' | 'JURIDICA';
}
