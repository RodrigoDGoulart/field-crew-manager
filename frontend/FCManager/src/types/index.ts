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
  isAdmin: boolean;
}

interface UsuarioItem {
  id: string;
  nome: string;
  sobrenome: string;
  foto: string;
  matricula: string;
}

interface Manobra {
  titulo: string;
  descricao: string;
  datetimeInicio: string;
  datetimeFim?: string;
  equipamentos: {
    id: string;
    tipo: string;
    img: string;
    serial: string;
  }[];
  usuario: {
    id: string;
    nome: string;
    sobrenome: string;
  };
}

interface ManobraItem {
  id: string;
  titulo: string;
  datetimeInicio: string;
  datetimeFim?: string;
  usuario: {
    id: string;
    nome: string;
    sobrenome: string;
  };
}

interface ErrorType {
  errorNum: number;
  errorMsg: string;
}

export type {
  Tipo,
  Equipamento,
  EquipamentoItem,
  Usuario,
  UsuarioItem,
  Manobra,
  ManobraItem,
  ErrorType,
};
