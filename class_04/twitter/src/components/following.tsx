import { TWEETS } from '../data/test-data';
import ComposeTweet from './compose-tweet';
import Tweets from './tweets';

export default function Following() {
	return (
		<div>
			<ComposeTweet />
			<Tweets tweets={TWEETS} />
		</div>
	);
}
