import ComposeTweet from './compose-tweet';
import Tweets from './tweets';

export default function Following() {
	return (
		<div>
			<h1>Following</h1>
			<ComposeTweet />
			<Tweets />
		</div>
	);
}
