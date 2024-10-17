'use server';

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
	revalidatePath('/feed', 'page');
}
