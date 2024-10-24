import { pgTableCreator, timestamp, uuid } from 'drizzle-orm/pg-core';
import { UserModel, users } from './user.schema';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { MessageExtendedModel, messages } from './messages.schema';

const createTable = pgTableCreator(
	name => `${process.env.q_DB_PREFIX!}_${name}`
);

export const conversations = createTable('conversations', {
	id: uuid('id').primaryKey().defaultRandom(),
	userA: uuid('user_a')
		.notNull()
		.references(() => users.id),
	userB: uuid('user_b')
		.notNull()
		.references(() => users.id),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const conversationsRelations = relations(
	conversations,
	// one and many are used to define the relations between the conversations and the users and messages
	// one is used to define a one-to-one relation
	// many is used to define a one-to-many relation
	({ one, many }) => ({
		// We define the relations between the conversations and the users
		userA: one(users, {
			fields: [conversations.userA],
			references: [users.id],
			relationName: 'userA',
		}),
		userB: one(users, {
			fields: [conversations.userB],
			references: [users.id],
			relationName: 'userB',
		}),
		// We define the relations between the conversations and the messages
		messages: many(messages, { relationName: 'messages' }),
	})
);

export type ConversationModel = InferSelectModel<typeof conversations>;
export type ConversationExtendedModel = InferSelectModel<
	typeof conversations
> & {
	userA: UserModel;
	userB: UserModel;
	messages: MessageExtendedModel[];
};
export type ConversationCreateModel = InferInsertModel<typeof conversations>;

// By using InferInsertModel, we can create a new conversation without having to specify the fields
// Drizzle will automatically infer the fields based on the schema
// This is useful when we want to create a new conversation
