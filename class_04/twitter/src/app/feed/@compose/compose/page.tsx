'use client';

import { ReactNode } from 'react';
import { Dialog, DialogHeader } from '../../../../components/ui/dialog';
import {
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@radix-ui/react-dialog';
import ComposeTweet from '../../../../components/compose-tweet';

type ModalProps = {
	children: ReactNode;
};

export default function Modal({ children }: ModalProps) {
	return (
		<Dialog defaultOpen>
			<DialogTrigger className='w-full'>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Compose a tweet</DialogTitle>
					<ComposeTweet />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
