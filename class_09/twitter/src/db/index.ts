import { messages, messagesRelations } from './schemas/messages.schema';
import {
	follows,
	usersFollowersRelations,
} from './schemas/users_follows.schema';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { tweets, tweetsRelations } from './schemas/tweet.schema';
import { users, usersRelations } from './schemas/user.schema';
import {
	usersLikedTweets,
	usersLikedTweetsRelations,
} from './schemas/users_liked_tweets';
import { sql } from '@vercel/postgres';
import {
	conversations,
	conversationsRelations,
} from './schemas/conversations.schema';

// We create a database instance using drizzle, passing the sql instance and the schemas
// We need to pass the schemas to the database instance to be able to use the relations
export const db = drizzle<{
	tweets: typeof tweets;
	users: typeof users;
	follows: typeof follows;
	usersLikedTweets: typeof usersLikedTweets;
	tweetsRelations: typeof tweetsRelations;
	usersRelations: typeof usersRelations;
	usersFollowersRelations: typeof usersFollowersRelations;
	usersLikedTweetsRelations: typeof usersLikedTweetsRelations;
	conversations: typeof conversations;
	conversationsRelations: typeof conversationsRelations;
	messages: typeof messages;
	messagesRelations: typeof messagesRelations;
}>(sql, {
	schema: {
		tweets,
		users,
		follows,
		usersLikedTweets,
		tweetsRelations,
		usersRelations,
		usersFollowersRelations,
		usersLikedTweetsRelations,
		conversations,
		conversationsRelations,
		messages,
		messagesRelations,
	},
	logger: true,
});

export type Db = typeof db;
