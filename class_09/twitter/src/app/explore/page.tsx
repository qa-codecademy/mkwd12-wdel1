'use client';

import { useEffect, useState } from 'react';
import Tweets from '../../components/tweets';
import { Input } from '../../components/ui/input';
import { TweetExtendedModel } from '../../db/schemas/tweet.schema';

export default function Explore() {
	const [searchTerm, setSearchTerm] = useState('');
	const [tweets, setTweets] = useState<TweetExtendedModel[]>([]);

	useEffect(() => {
		fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets?searchTerm=${searchTerm}`
		)
			.then(res => res.json())
			.then(tweetsResponse => setTweets(tweetsResponse));
	}, [searchTerm]);

	return (
		<div>
			<div className='p-4'>
				<Input
					placeholder='Search...'
					type='search'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>
			<div>
				<Tweets tweets={tweets} />
			</div>
		</div>
	);
}
