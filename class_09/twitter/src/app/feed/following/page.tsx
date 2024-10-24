import ComposeTweet from '../../../components/compose-tweet';
import Tweets from '../../../components/tweets';
import { getTweets } from '../../../services/tweets.service';

// This is not implemented due to lack of time. Only thing missing is filtering the tweets by the users the current user is following

export default async function Following() {
	const tweets = await getTweets();

	return (
		<div>
			<ComposeTweet />
			<Tweets tweets={tweets} />
		</div>
	);
}
