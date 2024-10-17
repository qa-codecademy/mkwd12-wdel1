'use client';

import { useEffect, useState } from 'react';
import Tweets from '../../../components/tweets';
import { TweetExtendedModel } from '../../../db/schemas/tweet.schema';

export default function Posts({ userId }: { userId: string }) {
	const [tweets, setTweets] = useState<TweetExtendedModel[]>([]);

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/user/${userId}/posts`)
			.then(res => res.json())
			.then(tweetsRes => setTweets(tweetsRes));
	}, [userId]);

	return <Tweets tweets={tweets} />;
}

// /api/tweets/user/[userId]/posts
// /api/tweets/user/[userId]/likes
// /api/tweets/user/[userId]/replies

// /api/tweets/posts/user/[userId]
// /api/tweets/likes/user/[userId]
// /api/tweets/replies/user/[userId]
