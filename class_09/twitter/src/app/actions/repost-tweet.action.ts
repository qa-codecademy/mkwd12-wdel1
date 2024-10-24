'use server';

// This is an action that is used to repost a tweet
// Actions are used to perform server-side actions
// They are used to perform actions like creating, updating, or deleting data
// From each action we call a service method where we perform the business logic

import { revalidatePath } from 'next/cache';
import { TweetCreateModel } from '../../db/schemas/tweet.schema';
import { createTweet } from '../../services/tweets.service';
import { TweetType } from '../../types/tweet-type.enum';

export async function repostTweet(formData: FormData) {
	const text = formData.get('text') as string;
	const originalTweetId = formData.get('originalTweetId') as string;
	const authorId = formData.get('originalTweetId') as string;

	const tweet: TweetCreateModel = {
		text,
		originalTweetId,
		type: TweetType.Repost,
		authorId,
	};

	await createTweet(tweet);

	// We revalidate the feed page to update the page and show the new repost
	revalidatePath('/feed', 'page');
}
