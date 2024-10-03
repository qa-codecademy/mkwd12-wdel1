import { TweetCreateModel, TweetModel } from '../db/schemas/tweet.schema';
import { create, find, findOneById } from '../repositories/tweets.repository';

export const getTweets = async (
	searchTerm?: string | null
): Promise<TweetModel[]> => {
	const tweets = await find(searchTerm);

	return tweets;
};

export const getTweetById = async (id: string) => {
	const tweet = await findOneById(id);

	return tweet;
};

export const createTweet = async (tweet: TweetCreateModel) => {
	const createdTweet = await create(tweet);

	console.log(createTweet);

	return createdTweet;
};
