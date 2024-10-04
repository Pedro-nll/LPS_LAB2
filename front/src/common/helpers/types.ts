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
    // agencia?: Agencia;
    // aluguel?: Aluguel[];
  };
