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

export type Automovel = {
    matricula?: string;
    ano?: number;
    marca?: string;
    modelo?: string;
    placa?: string;
    alugado?: boolean;
    imageUrl?: string;
    agencia?: any;
    // aluguel?: Aluguel[];
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