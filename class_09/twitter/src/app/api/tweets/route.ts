import { NextRequest, NextResponse } from 'next/server';
import { getTweets } from '../../../services/tweets.service';

export async function GET(req: NextRequest) {
	// We get the search term from the query parameters
	const searchTerm = req.nextUrl.searchParams?.get('searchTerm');

	// We get the tweets by the search term
	const tweets = await getTweets(searchTerm);

	return NextResponse.json(tweets);
}
