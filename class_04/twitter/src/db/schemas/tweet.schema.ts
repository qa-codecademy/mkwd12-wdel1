import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { TweetType } from '../../types/tweet-type.enum';

export const tweets = pgTable('tweets', {
	id: uuid('id').primaryKey().defaultRandom(),
	text: varchar('text', { length: 280 }).notNull(),
	type: varchar('type', {
		enum: [TweetType.Tweet, TweetType.Reply, TweetType.Repost],
	})
		.default(TweetType.Tweet)
		.notNull(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.notNull()
		.defaultNow(),
});

