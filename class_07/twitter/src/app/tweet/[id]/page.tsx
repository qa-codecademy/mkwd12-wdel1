import Tweet from '../../../components/tweet';
import { getTweetById } from '../../../services/tweets.service';
import { Tweet as ITweet } from '../../../types/tweet.interface';

type TweetDetailsProps = {
	params: { id: string };
};

export default async function TweetDetails({
	params: { id },
}: TweetDetailsProps) {
	const tweet = await getTweetById(id);

	console.log(tweet);

	return <Tweet tweet={tweet as unknown as ITweet} />;
}
