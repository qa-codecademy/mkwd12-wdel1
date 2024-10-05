import ComposeTweet from '../../../components/compose-tweet';
import Tweets from '../../../components/tweets';
import { Tweet as ITweet } from '../../../types/tweet.interface';
import { getTweets } from '../../../services/tweets.service';

export default async function ForYou() {
	const tweets = await getTweets();

	return (
		<div>
			<ComposeTweet />
			<Tweets tweets={tweets as unknown as ITweet[]} />
		</div>
	);
}
