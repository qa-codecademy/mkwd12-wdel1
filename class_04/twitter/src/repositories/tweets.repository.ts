import { eq, ilike } from 'drizzle-orm';
import { db } from '../db';
import {
	TweetCreateModel,
	TweetModel,
	tweets,
} from '../db/schemas/tweet.schema';

export const find = async (
	searchTerm?: string | null
): Promise<TweetModel[]> => {
	try {
		return db.query.tweets.findMany({
			where: ilike(tweets.text, `%${searchTerm ?? ''}%`),
		});
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const findOneById = (id: string) => {
	try {
		return db.query.tweets.findFirst({
			where: eq(tweets.id, id),
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
