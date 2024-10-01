import { TWEETS } from '../data/test-data';
import ComposeTweet from './compose-tweet';
import Tweets from './tweets';

export default function ForYou() {
	return (
		<div>
			<ComposeTweet />
			<Tweets tweets={TWEETS} />
		</div>
	);
}
