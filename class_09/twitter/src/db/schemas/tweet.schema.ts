import { pgTableCreator, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { TweetType } from '../../types/tweet-type.enum';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { UserLikedTweetsModel, usersLikedTweets } from './users_liked_tweets';
import { UserModel, users } from './user.schema';

const createTable = pgTableCreator(
	name => `${process.env.q_DB_PREFIX!}_${name}`
);

export const tweets = createTable('tweets', {
	id: uuid('id').primaryKey().defaultRandom(),
	text: varchar('text', { length: 280 }).notNull(),
	type: varchar('type', {
		enum: [TweetType.Tweet, TweetType.Reply, TweetType.Repost],
	})
		.default(TweetType.Tweet)
		.notNull(),
	originalTweetId: uuid('original_tweet_id'),
	repliedToId: uuid('replied_to_id'),
	authorId: uuid('author_id').notNull(),
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
	likes: many(usersLikedTweets),
	author: one(users, {
		fields: [tweets.authorId],
		references: [users.id],
		relationName: 'author',
	}),
}));

export type TweetModel = InferSelectModel<typeof tweets>;
export type TweetCreateModel = InferInsertModel<typeof tweets>;

export type TweetExtendedModel = TweetModel & {
	// reposts are the tweets that are reposted by the tweet
	reposts: TweetModel[];
	// originalTweet is the tweet that is reposted by the tweet
	originalTweet: TweetExtendedModel;
	// replies are the tweets that are replies to the tweet
	replies: TweetModel[];
	// repliedTo is the tweet that is replied to by the tweet
	repliedTo: TweetModel;
	// likes are the users that have liked the tweet
	likes: UserLikedTweetsModel[];
	// author is the user that has created the tweet
	author: UserModel;
};
