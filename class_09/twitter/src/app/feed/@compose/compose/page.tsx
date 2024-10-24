'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '../../../../components/ui/dialog';
import ComposeTweet from '../../../../components/compose-tweet';
import { useRouter } from 'next/navigation';

export default function Modal() {
	const router = useRouter();

	// By default the dialog is open, and when the dialog is closing, we redirect the user back to the feed page
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
