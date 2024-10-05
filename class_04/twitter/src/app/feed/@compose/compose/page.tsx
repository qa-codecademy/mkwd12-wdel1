'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '../../../../components/ui/dialog';
import ComposeTweet from '../../../../components/compose-tweet';
import { useRouter } from 'next/navigation';

// type ModalProps = {};

export default function Modal() {
	const router = useRouter();

	return (
		<Dialog defaultOpen onOpenChange={() => router.back()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Compose a tweet</DialogTitle>
					<ComposeTweet onSubmit={() => router.back()} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
