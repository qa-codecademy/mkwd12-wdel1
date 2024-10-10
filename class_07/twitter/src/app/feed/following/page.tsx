import ComposeTweet from '../../../components/compose-tweet';
import Tweets from '../../../components/tweets';
import { getTweets } from '../../../services/tweets.service';
import { Tweet as ITweet } from '../../../types/tweet.interface';

export default async function Following() {
	const tweets = await getTweets();

	return (
		<div>
			<ComposeTweet />
			<Tweets tweets={tweets as unknown as ITweet[]} />
		</div>
	);
}
