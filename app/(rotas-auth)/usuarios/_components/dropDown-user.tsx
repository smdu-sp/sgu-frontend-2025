/** @format */
'use client';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus } from 'lucide-react';

import ModalImportUsers from './modal-import-users';
import ModalUpdateAndCreate from './modal-update-create';

export default function DropDownUser() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size={'icon'}
					variant={'outline'}
					className={
						'bg-primary hover:bg-primary hover:opacity-70 group transition-all ease-linear duration-200'
					}>
					<Plus
						size={28}
						className='text-white group'
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={(e) => {
							e.stopPropagation(); // <- Isso evita que o Dropdown feche
						}}>
						<ModalUpdateAndCreate isUpdating={false} />
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={(e) => {
							e.stopPropagation(); // <- Isso evita que o Dropdown feche
						}}>
						<ModalImportUsers />
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
