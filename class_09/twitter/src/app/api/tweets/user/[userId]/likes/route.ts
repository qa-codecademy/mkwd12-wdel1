import { NextRequest, NextResponse } from 'next/server';
import { getUsersLikedTweets } from '../../../../../../services/tweets.service';

export async function GET(
	req: NextRequest,
	{ params: { userId } }: { params: { userId: string } }
) {
	const tweets = await getUsersLikedTweets(userId);

	return NextResponse.json(tweets);
}
