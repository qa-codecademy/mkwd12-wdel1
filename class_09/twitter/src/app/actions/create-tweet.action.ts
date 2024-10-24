'use server';

// This is an action that is used to create a new tweet
// Actions are used to perform server-side actions
// They are used to perform actions like creating, updating, or deleting data
// From each action we call a service method where we perform the business logic

import { revalidatePath } from 'next/cache';
import { TweetCreateModel } from '../../db/schemas/tweet.schema';
import { createTweet } from '../../services/tweets.service';

export async function submitTweet(formData: FormData) {
	const tweet: TweetCreateModel = {
		text: (formData.get('text') as string) || '',
		authorId: formData.get('authorId') as string,
	};

	await createTweet(tweet);

	// We revalidate the feed page to update the page and show the new tweet
	revalidatePath('/feed', 'page');
}
