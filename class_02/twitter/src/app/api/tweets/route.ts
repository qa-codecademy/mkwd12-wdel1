import { NextRequest, NextResponse } from 'next/server';
import { TWEETS } from '../../../data/test-data';

export async function GET(req: NextRequest) {
	const searchTerm = req.nextUrl.searchParams?.get('searchTerm');

	console.log('searchTerm', searchTerm);

	if (!searchTerm) {
		return NextResponse.json(TWEETS);
	}

	// TODO: Go to DB and search for tweet by searchTerm

	const filteredTweets = TWEETS.filter(tweet =>
		tweet.text.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return NextResponse.json(filteredTweets);
}
