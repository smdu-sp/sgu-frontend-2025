/** @format */

import { ICargaSigpec } from './carga-sigpec';
import { IFuncionario } from './funcionario';

export interface IUsuario {
	id: string;
	nome: string;
	login: string;
	email: string;
	permissao: IPermissao;
	avatar?: string;
	status: boolean;
	ultimoLogin: Date;
	criadoEm: Date;
	atualizadoEm: Date;
	nomeSocial?: string;
	estagiario: boolean;
	codigoUnidade: string;
	funcionario?: IFuncionario;
}

export enum IPermissao {
	DEV,
	ADM,
	USR,
}

export interface ICreateUsuario {
	nome: string;
	email: string;
	login: string;
	avatar?: string;
	permissao?: IPermissao;
	status?: boolean;
	nomeSocial?: string;
	estagiario: boolean;
	codigoUnidade: string;
	funcionario?: {
		rf: string;
		vinculo: string;
		nomeCargo: string;
		refCargo: string;
		observacao?: string;
	};
}

export interface IUpdateUsuario {
	id?: string;
	status?: boolean;
	nomeSocial?: string;
	avatar?: string;
	permissao?: IPermissao;
	estagiario?: boolean;
	codigoUnidade?: string;
	funcionario?: {
		vinculo?: string;
		nomeCargo?: string;
		refCargo?: string;
		observacao?: string;
	};
}

export interface IPaginadoUsuario {
	data: IUsuario[];
	total: number;
	pagina: number;
	limite: number;
}

export interface INovoUsuario {
	login: string;
	nome: string;
	email: string;
}

export interface IRespostaUsuario {
	ok: boolean;
	error: string | null;
	data:
		| INovoUsuario
		| IUsuario
		| IUsuario[]
		| IPaginadoUsuario
		| { autorizado: boolean }
		| { desativado: boolean }
		| ICargaSigpec[]
		| null;
	status: number;
}

export interface IUsuarioSession {
	sub: string;
	nome: string;
	login: string;
	email: string;
	nomeSocial?: string;
	permissao: IPermissao;
	estagiario: boolean;
	codigoUnidade: string;
	status: number;
	avatar?: string;
	iat: number;
	exp: number;
}
