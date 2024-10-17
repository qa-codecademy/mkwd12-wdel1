import { pgTableCreator, uuid, timestamp, varchar } from 'drizzle-orm/pg-core';
import { UserModel, users } from './user.schema';
import { relations, InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { conversations } from './conversations.schema';

const createTable = pgTableCreator(
	name => `${process.env.q_DB_PREFIX!}_${name}`
);

export const messages = createTable('messages', {
	id: uuid('id').primaryKey().defaultRandom(),
	text: varchar('text', { length: 280 }).notNull(),
	authorId: uuid('author_id')
		.notNull()
		.references(() => users.id),
	conversationId: uuid('conversation_id')
		.notNull()
		.references(() => conversations.id),
	createdAt: timestamp('created_at', { withTimezone: true }),
});

export const messagesRelations = relations(messages, ({ one }) => ({
	author: one(users, {
		fields: [messages.authorId],
		references: [users.id],
		relationName: 'author',
	}),
	conversation: one(conversations, {
		fields: [messages.conversationId],
		references: [conversations.id],
		relationName: 'messages',
	}),
}));

export type MessageModel = InferSelectModel<typeof messages>;
export type MessageExtendedModel = InferSelectModel<typeof messages> & {
	author: UserModel;
};
export type MessageCreateModel = InferInsertModel<typeof messages>;
