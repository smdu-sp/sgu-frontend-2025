/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { importar } from '@/services/usuarios/server-functions/importar';
import { CloudUpload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ModalImport() {
	const [file, setFile] = useState<File | null>();
	const [mes, setMes] = useState<string | null>();
	const [ano, setAno] = useState<number | null | string>(
		new Date().getFullYear(),
	);

	async function handleSubmit() {
		if (file && mes && ano) {
			const formData = new FormData();
			formData.append('file', file);

			// Aqui você pode fazer o que quiser com o formData, como enviar para um servidor
			console.log('Form data:', formData);
			const resp = await importar(formData, mes, ano.toString());

			if (!resp.ok) {
				console.log(resp.error);
				toast.error('Erro ao importar usuários');
			} else {
				toast.success('Usuários importados com sucesso!');
			}
		}
	}

	return (
		<Dialog>
			<DialogTrigger
				onClick={(e) => {
					e.stopPropagation(); // <- Isso evita que o Dropdown feche
				}}
				asChild>
				<Button className='w-full flex items-center justify-center gap-2 hover:bg-primary hover:opacity-70 transition-all ease-linear duration-200'>
					Importar Usuários
					<CloudUpload className='text-white' />
				</Button>
			</DialogTrigger>
			<DialogContent
				onClick={(e) => {
					e.stopPropagation(); // <- Isso evita que o Dropdown feche
				}}>
				<DialogHeader>
					<DialogTitle>Importar Dados</DialogTitle>
					<DialogDescription>
						Adicione o arquivo TXT para adicionar novos agendamentos
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<form
					encType='multipart/form-data'
					className=' flex flex-col gap-4'
					onClick={(e) => {
						e.stopPropagation(); // <- Isso evita que o Dropdown feche
					}}>
					<div className='flex w-full gap-10 justify-between text-foreground'>
						<div className='flex flex-col gap-2 text-foreground w-full'>
							<label className='text-xs'>Selecione o mês</label>
							<Select
								onValueChange={setMes}
								defaultValue={mes ?? ''}>
								<SelectTrigger>
									<SelectValue placeholder='Selecione o mês' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='01'>Janeiro</SelectItem>
									<SelectItem value='02'>Fevereiro</SelectItem>
									<SelectItem value='03'>Março</SelectItem>
									<SelectItem value='04'>Abril</SelectItem>
									<SelectItem value='05'>Maio</SelectItem>
									<SelectItem value='06'>Junho</SelectItem>
									<SelectItem value='07'>Julho</SelectItem>
									<SelectItem value='08'>Agosto</SelectItem>
									<SelectItem value='09'>Setembro</SelectItem>
									<SelectItem value='10'>Outubro</SelectItem>
									<SelectItem value='11'>Novembro</SelectItem>
									<SelectItem value='12'>Dezembro</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='flex flex-col gap-2 text-foreground w-full'>
							<label className='text-xs'>Selecione o ano</label>
							<input
								value={ano ?? ''}
								className='border rounded-lg p-2 text-sm'
								onChange={(e) => setAno(e.target.value)}
								type='number'
								min={new Date().getFullYear()}
								placeholder='Selecione o ano'
								onClick={(e) => {
									e.stopPropagation(); // <- Isso evita que o Dropdown feche
								}}
							/>
						</div>
					</div>
					<label
						htmlFor='file'
						className='border-2 flex p-4 rounded-lg cursor-pointer items-center justify-center gap-2 text-muted-foreground border-dashed hover:border-primary hover:text-primary transition-all ease-in-out duration-200'>
						<CloudUpload size={24} />
					</label>
					<input
						onChange={(e) => {
							const files = e.target.files;
							if (files && files[0]) {
								setFile(files[0]);
							}
						}}
						id='file'
						type='file'
						name='arquivo'
						accept='.txt'
						title='Selecione o arquivo'
						className='hidden'
					/>
					<Button
						onClick={handleSubmit}
						type='submit'
						className=' w-full'>
						Enviar
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
