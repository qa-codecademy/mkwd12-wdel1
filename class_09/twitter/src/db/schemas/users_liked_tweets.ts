import { pgTable, uuid, primaryKey, pgTableCreator } from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { tweets } from './tweet.schema';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

const createTable = pgTableCreator(
	name => `${process.env.q_DB_PREFIX!}_${name}`
);

export const usersLikedTweets = createTable(
	'user_liked_tweets',
	{
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id),
		tweetId: uuid('tweet_id')
			.notNull()
			.references(() => tweets.id),
	},
	t => ({
		pk: primaryKey({ columns: [t.userId, t.tweetId] }),
	})
);

export const usersLikedTweetsRelations = relations(
	usersLikedTweets,
	({ one }) => ({
		tweet: one(tweets, {
			fields: [usersLikedTweets.tweetId],
			references: [tweets.id],
		}),
		user: one(users, {
			fields: [usersLikedTweets.userId],
			references: [users.id],
		}),
	})
);

export type UserLikedTweetsModel = InferSelectModel<typeof usersLikedTweets>;
export type UserLikedTweetsCreateModel = InferInsertModel<
	typeof usersLikedTweets
>;
