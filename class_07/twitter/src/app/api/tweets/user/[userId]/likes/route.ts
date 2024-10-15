import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(
	req: NextApiRequest,
	{ params: { userId } }: { params: { userId: string } }
) {
	const tweets = await getUsersLikedTweets(userId);

	return NextResponse.json(tweets);
}
