import { getTweets } from '../services/tweets.service';
import ComposeTweet from './compose-tweet';
import Tweets from './tweets';
import { Tweet as ITweet } from '../types/tweet.interface';

export default async function Following() {
	const tweets = await getTweets();

	return (
		<div>
			<ComposeTweet />
			<Tweets tweets={tweets as unknown as ITweet[]} />
		</div>
	);
}
