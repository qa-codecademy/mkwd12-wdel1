'use server';

import { revalidatePath } from 'next/cache';
import { TweetCreateModel } from '../../db/schemas/tweet.schema';
import { createTweet } from '../../services/tweets.service';
import { TweetType } from '../../types/tweet-type.enum';

export async function repostTweet(formData: FormData) {
	const text = formData.get('text') as string;
	const originalTweetId = formData.get('originalTweetId') as string;

	const tweet: TweetCreateModel = {
		text,
		originalTweetId,
		type: TweetType.Repost,
	};

	console.log('🚀 ivo-test ~ repostTweet ~ tweet:', tweet);

	await createTweet(tweet);

	revalidatePath('/feed', 'page');
}
