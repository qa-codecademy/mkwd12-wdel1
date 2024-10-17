'use server';

import { revalidatePath } from 'next/cache';
import { likeTweet, unlikeTweet } from '../../services/tweets.service';

export default async function likeTweetAction(formData: FormData) {
	const isLikedByCurrentUser = formData.get('isLiked') === 'true';
	const tweetId = formData.get('tweetId') as string;

	if (!isLikedByCurrentUser) {
		await likeTweet(tweetId);
	} else {
		await unlikeTweet(tweetId);
	}

	revalidatePath('/', 'page');
}
