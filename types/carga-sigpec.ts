/** @format */

export interface ICargaSigpec {
	id: string;
	rf: string;
	nome?: string | null;
	vinculo?: string | null;
	especie?: string | null;
	inicio?: Date | null;
	termino?: Date | null;
	cargo?: string | null;
	nomeCargo?: string | null;
	refCargo?: string | null;
	unidade?: string | null;
	nomeSetor?: string | null;
	relJurAdm?: string | null;
	tipoEvento?: string | null;
	inicioExerc?: Date | null;
	titular?: string | null;
	numVincTit?: string | null;
	nomeFuncTit?: string | null;
	inicioRem?: Date | null;
	fimRem?: Date | null;
	observacao?: string | null;
	vaga?: string | null;
	mes: number;
	ano: number;
	criadoEm: Date;
	atualizadoEm: Date;
}
