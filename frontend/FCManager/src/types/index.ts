interface Tipo {
  id: string;
  value: string;
}

interface EquipamentoItem {
  id: string;
  tipo: Tipo;
  serial: string;
  status: 'ativo' | 'inativo';
  img: string;
}

interface Equipamento {
  id: string;
  tipo: Tipo;
  serial: string;
  cidade: string;
  obs: string;
  status: 'ativo' | 'inativo';
  imgs: string[];
}

interface Usuario {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  matricula: string;
  cpf: string;
  foto: string;
  isAdmin: boolean
}

interface Manobra {
  titulo: string;
  descricao: string;
  datetimeInicio: Date;
  datetimeFim?: Date;
  equipamentos: EquipamentoItem[];
  usuario: {
    id: string;
    nome: string;
    sobrenome: string;
  }
}

interface ManobraItem {
  id: string;
  titulo: string;
  datetimeInicio: Date;
  datetimeFim?: Date;
  usuario: {
    id: string;
    nome: string;
    sobrenome: string;
  };
}

export type {Tipo, Equipamento, EquipamentoItem, Usuario, Manobra, ManobraItem};
