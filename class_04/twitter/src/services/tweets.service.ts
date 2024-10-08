import {
	TweetCreateModel,
	TweetExtendedModel,
} from '../db/schemas/tweet.schema';
import { create, find, findOneById } from '../repositories/tweets.repository';

export const getTweets = async (
	searchTerm?: string | null
): Promise<TweetExtendedModel[]> => {
	const tweets = await find(searchTerm);
	
	console.log("🚀 ivo-test ~ tweets:", tweets)

	return tweets as TweetExtendedModel[];
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


