export type User = {
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    userType?: string,
    rg?: string,
    cpf?: string,
    endereco?: Endereco,
}

export type UserLogin = {
    email?: string,
    password?: string,
}

export type UserToken = {
    email?: string,
    token?: string,
}

export type Message = {
    title: string,
    message: string
}

export type UserRecoverPassword = {
    email?: string,
    password?: string,
    token?: string,
}

export type Endereco = {
    id: number;
    logradouro: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
};


  export type AluguelDTO = {
    id?: number;
    valorMensal?: number;
    valorPendente?: number;
    atrasado?: boolean;
    ativo?: boolean;
    taxaJuros?: number;
    automovelMatricula?: string;
    agenciaId?: number;
    banco?: number;
    clienteId?: number;
  };
  
  export type UserSlice = {
    user: User
    forgotPasswordUser: UserToken
  }

  export type RentCarSlice = {
    car: Automovel
  }

export type Rent = {
    id?: number;
    valorMensal: number;
    valorPendente: number;
    atrasado: boolean;
    ativo: boolean;
    taxaJuros: number;
    automovelMatricula: string;
    agenciaId: number;
    banco: number;
    clienteId: number;
};

export type Aluguel = {
  id?: number | null;
  valorMensal?: number | null;
  valorPendente?: number | null;
  atrasado?: boolean | null;
  ativo?: boolean | null;
  taxaJuros?: number | null;
  situacao?: string | null;
  banco?: number | null;
  clienteId?: number | null;
  agenciaIdentifier?: number | null;
  automovelMatricula?: string | null;
};

export type Agencia = {
  id?: number | null;
  name?: string | null;
  email?: string | null;
};

export type Automovel = {
  matricula?: string | null;
  ano?: number | null;
  marca?: string | null;
  modelo?: string | null;
  placa?: string | null;
  alugado?: boolean | null;
  imageUrl?: string | null;
  agencia?: Agencia | null;
  aluguel?: Aluguel[] | null;
};
