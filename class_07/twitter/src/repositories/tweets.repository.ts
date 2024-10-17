import { desc, eq, ilike, and, ne } from 'drizzle-orm';
import { db } from '../db';
import {
	TweetCreateModel,
	TweetModel,
	tweets,
} from '../db/schemas/tweet.schema';
import { TweetType } from '../types/tweet-type.enum';

export const find = async (
	searchTerm?: string | null
): Promise<TweetModel[]> => {
	try {
		return db.query.tweets.findMany({
			where: ilike(tweets.text, `%${searchTerm ?? ''}%`),
			orderBy: desc(tweets.createdAt),
			with: {
				repliedTo: true,
				replies: true,
				reposts: true,
				likes: true,
				author: true,
				originalTweet: true,
			},
		});
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const findTweetsByUserId = (userId: string) => {
	return db.query.tweets.findMany({
		where: and(eq(tweets.authorId, userId), ne(tweets.type, TweetType.Reply)),
		with: {
			likes: true,
			author: true,
			replies: true,
			reposts: true,
			originalTweet: true,
			repliedTo: true,
		},
	});
};

export const findRepliesByUserId = (userId: string) => {
	return db.query.tweets.findMany({
		where: and(eq(tweets.authorId, userId), eq(tweets.type, TweetType.Reply)),
		with: {
			likes: true,
			author: true,
			repliedTo: true,
			replies: true,
			reposts: true,
			originalTweet: true,
		},
	});
};

export const findLikedTweetsByUserId = (userId: string) => {
	return db.query.tweets.findMany({
		where: and(eq(tweets.authorId, userId), eq(tweets.type, TweetType.Reply)),
		with: {
			likes: true,
			author: true,
			repliedTo: true,
			replies: true,
			reposts: true,
		},
	});
};

export const findOneById = (id: string) => {
	try {
		return db.query.tweets.findFirst({
			where: eq(tweets.id, id),
			with: {
				author: true,
				likes: true,
				reposts: true,
				replies: true,
				repliedTo: true,
				originalTweet: true,
			},
		});
	} catch (error) {
		console.error(error);
	}
};
          
export const create = (tweet: TweetCreateModel): Promise<TweetModel> => {
	return db
		.insert(tweets)
		.values(tweet)
		.returning()
		.then(res => res?.[0]);
};
