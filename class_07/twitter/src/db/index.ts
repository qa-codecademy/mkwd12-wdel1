import {
	follows,
	usersFollowersRelations,
} from './schemas/users_follows.schema';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { tweets, tweetsRelations } from './schemas/tweet.schema';
import { users, usersRelations } from './schemas/user.schema';
import {
	usersLikedTweets,
	usersLikedTweetsRelations,
} from './schemas/users_liked_tweets';

const client = postgres({
	host: 'localhost',
	user: 'postgres',
	password: 'postgres',
	database: 'twitter',
	port: 5432,
});

export const db = drizzle<{
	tweets: typeof tweets;
	users: typeof users;
	follows: typeof follows;
	usersLikedTweets: typeof usersLikedTweets;
	tweetsRelations: typeof tweetsRelations;
	usersRelations: typeof usersRelations;
	usersFollowersRelations: typeof usersFollowersRelations;
	usersLikedTweetsRelations: typeof usersLikedTweetsRelations;
}>(client, {
	schema: {
		tweets,
		users,
		follows,
		usersLikedTweets,
		tweetsRelations,
		usersRelations,
		usersFollowersRelations,
		usersLikedTweetsRelations,
	},
	logger: true,
});

export type Db = typeof db;
