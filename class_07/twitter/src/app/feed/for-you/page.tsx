import ComposeTweet from '../../../components/compose-tweet';
import Tweets from '../../../components/tweets';
import { getTweets } from '../../../services/tweets.service';

export default async function ForYou() {
	const tweets = await getTweets();

	return (
		<div>
			<ComposeTweet />
			<Tweets tweets={tweets} />
		</div>
	);
}
