import { getTweetById } from '../../../../services/tweets.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params: { id } }: { params: { id: string } }
) {
	const tweet = await getTweetById(id);

	return NextResponse.json(tweet);
}
