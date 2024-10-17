import Tweet from '../../../components/tweet';
import Tweets from '../../../components/tweets';
import { TweetExtendedModel } from '../../../db/schemas/tweet.schema';
import { getTweetById } from '../../../services/tweets.service';

type TweetDetailsProps = {
	params: { id: string };
};

export default async function TweetDetails({
	params: { id },
}: TweetDetailsProps) {
	const tweet = await getTweetById(id);

	if (!tweet) {
		return <h1>Tweet not found</h1>;
	}

	return (
		<div>
			<Tweet tweet={tweet} />
			<Tweets tweets={(tweet.replies as TweetExtendedModel[]) ?? []} />
		</div>
	);
}
