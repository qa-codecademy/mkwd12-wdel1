import Tweet from '../../../components/tweet';
import Tweets from '../../../components/tweets';
import { TweetExtendedModel } from '../../../db/schemas/tweet.schema';
import { getTweetById } from '../../../services/tweets.service';

type TweetDetailsProps = {
	params: { id: string };
};

// Here we showcase a single tweet and all the replies to that tweet

export default async function TweetDetails({
	params: { id },
}: TweetDetailsProps) {
	const tweet = await getTweetById(id);

	if (!tweet) {
		// This should be handled better, we should show a 404 page using not-found.tsx
		return <h1>Tweet not found</h1>;
	}

	return (
		<div>
			<Tweet tweet={tweet} />
			<Tweets tweets={(tweet.replies as TweetExtendedModel[]) ?? []} />
		</div>
	);
}
