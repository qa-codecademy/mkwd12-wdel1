'use client';

import { useEffect, useState } from 'react';
import Tweets from '../../../components/tweets';
import { TweetExtendedModel } from '../../../db/schemas/tweet.schema';

export default function Replies({ userId }: { userId: string }) {
	const [tweets, setTweets] = useState<TweetExtendedModel[]>([]);

	useEffect(() => {
		fetch(`http://localhost:3000/api/tweets/user/${userId}/replies`)
			.then(res => res.json())
			.then(tweetsRes => setTweets(tweetsRes));
	}, [userId]);

	return <Tweets tweets={tweets} />;
}
