import { ConversationModel } from './conversations.schema';
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
	({ one, many }) => ({
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
		messages: many(messages, { relationName: 'message' }),
	})
);

export type ConversationModel = InferSelectModel<typeof conversations>;
export type ConversationExtendedModel = InferSelectModel<
	typeof conversations
> & {
	userA: UserModel;
	userB: UserModel;
	messages: MessageExtendedModel;
};

export type ConversationCreateModel = InferInsertModel<typeof conversations>;
