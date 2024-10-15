import {
	TweetCreateModel,
	TweetExtendedModel,
} from '../db/schemas/tweet.schema';
import { getNextServerSession } from '../lib/next-auth';
import { create, find, findOneById } from '../repositories/tweets.repository';
import {
	create as createLike,
	deleteTweet,
} from '../repositories/like.repository';

export const getTweets = async (
	searchTerm?: string | null
): Promise<TweetExtendedModel[]> => {
	const tweets = await find(searchTerm);

	return tweets as TweetExtendedModel[];
};

export const getTweetById = async (id: string) => {
	const tweet = await findOneById(id);

	return tweet;
};

export const createTweet = async (tweet: TweetCreateModel) => {
	const createdTweet = await create(tweet);

	return createdTweet;
};

export const likeTweet = async (tweetId: string) => {
	const session = await getNextServerSession();

	if (!session?.user.id) {
		return;
	}

	await createLike(tweetId, session.user.id);
};

export const unlikeTweet = async (tweetId: string) => {
	const session = await getNextServerSession();

	if (!session?.user.id) {
		return;
	}

	await deleteTweet(tweetId, session.user.id);
};