import { ConversationExtendedModel } from '../db/schemas/conversations.schema';

import {
	createConversation,
	findManyByUserId,
	createMessage as createMessageInDB,
	findConversationById,
	findConversationBetweenUsers,
} from '../repositories/messages.repository';

// Services are used to handle business logic
// They are used to validate data, perform calculations, etc.
// They are used in:
// - Controllers (API routes)
// - Middleware (authentication, authorization)
// - Server Components

export async function getConversations(userId: string) {
	const conversations = await findManyByUserId(userId);

	return conversations as ConversationExtendedModel[];
}

export async function getConversationById(id: string) {
	const conversation = await findConversationById(id);

	return conversation as ConversationExtendedModel;
}

export async function createMessage({
	userA,
	userB,
	text,
}: {
	userA: string;
	userB: string;
	text: string;
}) {
	// We check if the two users are already chatting
	const conversation = await findConversationBetweenUsers(userA, userB);

	// If they are, we create a new message in the conversation
	if (conversation) {
		return createMessageInDB({
			text,
			authorId: userA,
			conversationId: conversation.id,
		});
	}

	// If they are not, we create a new conversation
	const newConversation = await createConversation({
		userA,
		userB,
	});

	// ...and a new message in the conversation
	return createMessageInDB({
		text,
		authorId: userA,
		conversationId: newConversation.id,
	});
}
