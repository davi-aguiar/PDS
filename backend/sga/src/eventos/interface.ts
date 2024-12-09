import { Prisma } from '@prisma/client';

export interface CreateOcorrenciaDTO {
  tipo_ocorrencia?: string;
  endereco_atual?: string;
  matriculaFuncionario?: number;
  participacao?: Prisma.Decimal | null;
}

export interface UpdateOcorrenciaDTO {
  tipo_ocorrencia?: string;
  endereco_atual?: string;
  participacao?: Prisma.Decimal | null;
}

export interface CreateOficinaDTO {
  oficina_credenciada: string;
  pecas?: string;
  qtd_veiculos_atuais?: number;
  matriculaFuncionario?: number;
}

export interface UpdateOficinaDTO {
  oficina_credenciada?: string;
  pecas?: string;
  qtd_veiculos_atuais?: number;
}

export interface CreateIndividuoEnvolvidoDTO {
  individuos_envolvidos: string;
  protocolo?: number;
}

export interface UpdateIndividuoEnvolvidoDTO {
  individuos_envolvidos?: string;
}

export interface CreateSinistroDTO {
  chassi: string;
  protocolo: number;
  dia?: number;
  mes?: number;
  ano?: number;
}

export interface UpdateSinistroDTO {
  dia?: number;
  mes?: number;
  ano?: number;
}
