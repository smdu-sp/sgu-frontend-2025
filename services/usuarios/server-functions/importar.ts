/** @format */

'use server';

import { auth } from '@/lib/auth/auth';
import { ICargaSigpec } from '@/types/carga-sigpec';
import { IRespostaUsuario } from '@/types/usuario';
import { redirect } from 'next/navigation';

export async function importar(
	data: FormData,
	mes: string,
	ano: string,
): Promise<IRespostaUsuario> {
	const session = await auth();
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	if (!session) redirect('/login');

	const response: Response = await fetch(
		`${baseURL}usuarios/importar?mes=${mes}&ano=${ano}`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${session?.access_token}`,
			},
			body: data,
		},
	);

	const dataResponse = await response.json();
	if (response.status === 201) {
		// revalidateTag('users');
		return {
			ok: true,
			error: null,
			data: dataResponse as ICargaSigpec[],
			status: 201,
		};
	}
	if (!dataResponse)
		return {
			ok: false,
			error: 'Erro ao criar novo usuário.',
			data: null,
			status: 500,
		};
	return {
		ok: false,
		error: dataResponse.message,
		data: null,
		status: dataResponse.statusCode,
	};
}
