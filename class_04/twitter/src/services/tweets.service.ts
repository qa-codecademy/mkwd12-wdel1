import { TweetModel } from '../db/schemas/tweet.schema';
import { find, findOneById } from '../repositories/tweets.repository';

export const getTweets = async (
	searchTerm: string | null
): Promise<TweetModel[]> => {
	const tweets = await find(searchTerm);

	return tweets;
};

export const getTweetById = async (id: string) => {
	const tweet = await findOneById(id);

	return tweet;
};
