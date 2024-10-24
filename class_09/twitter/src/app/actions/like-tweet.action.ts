'use server';

// This is an action that is used to like or unlike a tweet
// Actions are used to perform server-side actions
// They are used to perform actions like creating, updating, or deleting data
// From each action we call a service method where we perform the business logic

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

	// We revalidate the feed page to update the page and show the updated like status
	revalidatePath('/', 'page');
}
