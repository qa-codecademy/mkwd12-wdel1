'use server';

// This is an action that is used to send a message to a user
// Actions are used to perform server-side actions
// They are used to perform actions like creating, updating, or deleting data
// From each action we call a service method where we perform the business logic

import { revalidatePath } from 'next/cache';
import { createMessage } from '../../services/messages.service';

export async function sendMessage(formData: FormData) {
	const message = {
		userA: formData.get('userA') as string,
		userB: formData.get('userB') as string,
		text: formData.get('text') as string,
	};

	const createdMessage = await createMessage(message);

	// We revalidate the messages page to update the page and show the new message
	revalidatePath('/messages/' + createdMessage.conversationId, 'page');
}
