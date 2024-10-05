import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { TweetType } from '../../types/tweet-type.enum';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

export const tweets = pgTable('tweets', {
	id: uuid('id').primaryKey().defaultRandom(),
	text: varchar('text', { length: 280 }).notNull(),
	type: varchar('type', {
		enum: [TweetType.Tweet, TweetType.Reply, TweetType.Repost],
	})
		.default(TweetType.Tweet)
		.notNull(),
	originalTweetId: uuid('original_tweet_id'),
	repliedToId: uuid('replied_to_id'),
	createdAt: timestamp('created_at', { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const tweetsRelations = relations(tweets, ({ one, many }) => ({
	reposts: many(tweets, { relationName: 'reposts' }),
	originalTweet: one(tweets, {
		fields: [tweets.originalTweetId],
		references: [tweets.id],
		relationName: 'reposts',
	}),
	replies: many(tweets, { relationName: 'replies' }),
	repliedTo: one(tweets, {
		fields: [tweets.repliedToId],
		references: [tweets.id],
		relationName: 'replies',
	}),
}));

export type TweetModel = InferSelectModel<typeof tweets>;
export type TweetCreateModel = InferInsertModel<typeof tweets>;

export type TweetExtendedModel = TweetModel & {
	reposts: TweetModel[];
	replies: TweetModel[];
};
