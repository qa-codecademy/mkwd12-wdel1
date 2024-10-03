import { NextRequest, NextResponse } from 'next/server';
import { getTweets } from '../../../services/tweets.service';

export async function GET(req: NextRequest) {
	const searchTerm = req.nextUrl.searchParams?.get('searchTerm');

	console.log('searchTerm', searchTerm);

	const tweets = await getTweets(searchTerm);

	return NextResponse.json(tweets);
}
