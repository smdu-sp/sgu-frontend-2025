/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
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
import { CheckCircle, CloudUpload, Loader2, XIcon } from 'lucide-react';
import { FormEvent, useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function ModalImport() {
	const [file, setFile] = useState<File | null>();
	const [mes, setMes] = useState<string | null>();
	const [open, setOpen] = useState(false);
	const [ano, setAno] = useState<number | null | string>(
		new Date().getFullYear(),
	);

	const [pending, startTransition] = useTransition();

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		startTransition(async () => {
			if (file && mes && ano) {
				const form = new FormData();
				form.append('arquivo', file);
				// Aqui você pode fazer o que quiser com o formData, como enviar para um servidor

				const resp = await importar(form, mes, ano.toString());

				if (!resp.ok) {
					console.log(resp.error);
					toast.error('Erro ao importar usuários');
				} else {
					toast.success('Usuários importados com sucesso!');
					setOpen(false);
				}
			}
		});
	}

	function handleClick(
		e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>,
	) {
		e.stopPropagation();
		setOpen(!open);
	}

	return (
		<Dialog
			open={open}
			onOpenChange={() => setOpen}>
			<DialogTrigger
				onClick={(e) => {
					handleClick(e); // <- Isso evita que o Dropdown feche
				}}
				asChild>
				<Button className='w-full flex items-center justify-center gap-2 hover:bg-primary hover:opacity-70 transition-all ease-linear duration-200'>
					Importar Usuários
					<CloudUpload className='text-white' />
				</Button>
			</DialogTrigger>
			<DialogContent
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<DialogHeader>
					<DialogClose
						onClick={(e) => handleClick(e)}
						className='text-muted-foreground absolute top-2 right-2 rounded-xs bg-white p-2 z-20'>
						<XIcon size={20} />
					</DialogClose>
					<DialogTitle>Importar Dados</DialogTitle>
					<DialogDescription>
						Adicione o arquivo TXT para adicionar novos agendamentos
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className='flex w-full gap-5 justify-between text-foreground'>
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
				<form
					onSubmit={(e) => handleSubmit(e)}
					encType='multipart/form-data'
					className=' flex flex-col gap-4'
					onClick={(e) => {
						e.stopPropagation(); // <- Isso evita que o Dropdown feche
					}}>
					<label
						htmlFor='file'
						className={`${
							file
								? 'bg-primary/10 text-primary font-semibold'
								: 'border-2 text-muted-foreground'
						}  flex p-4 rounded-lg cursor-pointer items-center justify-center gap-2  border-dashed hover:border-primary hover:text-primary transition-all ease-in-out duration-200`}>
						{file ? (
							<p className='flex items-center gap-2'>
								{file.name}
								<CheckCircle size={16} />
							</p>
						) : (
							<CloudUpload size={24} />
						)}
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
						disabled={pending || !file}
						type='submit'
						className=' w-full'>
						Enviar {pending && <Loader2 className='animate-spin ml-2' />}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
