import { Tweet as ITweet } from '../types/tweet.interface';
import Tweet from './tweet';

type TweetsProps = {
	tweets: ITweet[];
};

export default function Tweets({ tweets }: TweetsProps) {
	return (
		<div>
			{tweets.map(tweet => (
				<Tweet key={tweet.id} tweet={tweet} />
			))}
		</div>
	);
}
