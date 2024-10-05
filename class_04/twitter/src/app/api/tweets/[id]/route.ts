import { NextApiRequest } from 'next';
import { getTweetById } from '../../../../services/tweets.service';
import { NextResponse } from 'next/server';

export async function GET(
	req: NextApiRequest,
	{ params: { id } }: { params: { id: string } }
) {
	const tweet = await getTweetById(id);

	return NextResponse.json(tweet);
}
