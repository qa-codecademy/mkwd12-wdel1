import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { usersLikedTweets } from '../db/schemas/users_liked_tweets';

export const create = (tweetId: string, userId: string) =>
	db
		.insert(usersLikedTweets)
		.values({ tweetId, userId })
		.returning()
		.then(res => res?.[0]); // Returning the first element of the array, as drizzle always returns an array

export function deleteTweet(tweetId: string, userId: string) {
	return db
		.delete(usersLikedTweets)
		.where(
			and(
				eq(usersLikedTweets.tweetId, tweetId),
				eq(usersLikedTweets.userId, userId)
			)
		);
}
