import { NextRequest, NextResponse } from 'next/server';
import { getUsersReplies } from '../../../../../../services/tweets.service';

export async function GET(
	req: NextRequest,
	// We get the userId from the URL parameters
	{ params: { userId } }: { params: { userId: string } }
) {
	const tweets = await getUsersReplies(userId);

	return NextResponse.json(tweets);
}
