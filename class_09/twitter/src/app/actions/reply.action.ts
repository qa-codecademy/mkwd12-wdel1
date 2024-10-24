'use server';

// This is an action that is used to submit a reply to a tweet
// Actions are used to perform server-side actions
// They are used to perform actions like creating, updating, or deleting data
// From each action we call a service method where we perform the business logic

import { revalidatePath } from 'next/cache';
import { TweetCreateModel } from '../../db/schemas/tweet.schema';
import { createTweet } from '../../services/tweets.service';
import { TweetType } from '../../types/tweet-type.enum';

export async function submitReply(formData: FormData) {
	const text = formData.get('text') as string;
	const repliedToId = formData.get('repliedToId') as string;
	const authorId = formData.get('authorId') as string;

	const tweet: TweetCreateModel = {
		text,
		type: TweetType.Reply,
		authorId,
		repliedToId,
	};
	await createTweet(tweet);

	// We revalidate the feed page to update the page and show the new reply
	revalidatePath('/feed', 'page');
}
