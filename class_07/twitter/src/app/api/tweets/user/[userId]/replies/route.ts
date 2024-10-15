import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getUsersReplies } from '../../../../../../services/tweets.service';

export async function GET(
	req: NextApiRequest,
	{ params: { userId } }: { params: { userId: string } }
) {
	const tweets = await getUsersReplies(userId);

	return NextResponse.json(tweets);
}
