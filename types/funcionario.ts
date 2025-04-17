import { IUsuario } from "./usuario";

export interface IFuncionario {
    usuarioId: string;
    rf: string;
    vinculo: string;
    nomeCargo: string;
    refCargo: string;
    observacao?: string;
    usuario?: IUsuario
}

export interface ICreateFuncionario {
    usuarioId: string;
    rf: string;
    vinculo: string;
    nomeCargo: string;
    refCargo: string;
    observacao?: string;
}

export interface IUpdateFuncionario {
    vinculo: string;
    nomeCargo: string;
    refCargo: string;
    observacao?: string;
}

export interface IPaginadoFuncionario {
    data: IFuncionario[];
    total: number;
    pagina: number;
    limite: number;
}

export interface IRespostaFuncionario {
    ok: boolean;
    error: string | null;
    status: number;
    data: IFuncionario | IFuncionario[] | IPaginadoFuncionario | null;
}