import ComposeTweet from './compose-tweet';
import Tweets from './tweets';

export default function ForYou() {
	return (
		<div>
			<h1>For You</h1>
			<ComposeTweet />
			<Tweets />
		</div>
	);
}
