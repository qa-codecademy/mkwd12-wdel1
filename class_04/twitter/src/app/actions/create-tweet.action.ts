'use server';

import { revalidatePath } from 'next/cache';
import { TweetCreateModel } from '../../db/schemas/tweet.schema';
import { createTweet } from '../../services/tweets.service';

export async function submitTweet(formData: FormData) {
	const tweet: TweetCreateModel = {
		text: (formData.get('text') as string) || '',
	};

	await createTweet(tweet);

	revalidatePath('/feed', 'page');
}
