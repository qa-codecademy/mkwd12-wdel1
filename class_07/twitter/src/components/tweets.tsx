import { TweetExtendedModel } from '../db/schemas/tweet.schema';
import Tweet from './tweet';

type TweetsProps = {
	tweets: TweetExtendedModel[];
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
