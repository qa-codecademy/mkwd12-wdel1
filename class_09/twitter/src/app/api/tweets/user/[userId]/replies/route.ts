import { NextRequest, NextResponse } from 'next/server';
import { getUsersReplies } from '../../../../../../services/tweets.service';

export async function GET(
	req: NextRequest,
	{ params: { userId } }: { params: { userId: string } }
) {
	const tweets = await getUsersReplies(userId);

	return NextResponse.json(tweets);
}
