import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import {
	uuid,
	varchar,
	timestamp,
	unique,
	pgTableCreator,
} from 'drizzle-orm/pg-core';
import { follows } from './users_follows.schema';
import { usersLikedTweets } from './users_liked_tweets';

const createTable = pgTableCreator(
	name => `${process.env.q_DB_PREFIX!}_${name}`
);

export const users = createTable(
	'users',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: varchar('name', { length: 30 }).notNull(),
		username: varchar('username', { length: 20 }).notNull(),
		password: varchar('password').notNull(),
		joinDate: timestamp('join_date', { withTimezone: true })
			.notNull()
			.defaultNow(),
		url: varchar('url'),
		location: varchar('location'),
		description: varchar('description'),
		avatar: varchar('avatar'),
		createdAt: timestamp('created_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	t => ({
		// Here we define a unique constraint on the username column
		unq: unique().on(t.username),
	})
);

export const usersRelations = relations(users, ({ many }) => ({
	// following are the users that the user is following
	following: many(follows, { relationName: 'follows' }),
	// followers are the users that are following the user
	followers: many(follows, { relationName: 'followers' }),
	// liked tweets are the tweets that the user has liked
	likedTweets: many(usersLikedTweets),
}));

export type UserModel = InferSelectModel<typeof users>;
export type UserCreateModel = InferInsertModel<typeof users>;

export type UserExtendedModel = UserModel & {
	followers: UserModel[];
	following: UserModel[];
};
