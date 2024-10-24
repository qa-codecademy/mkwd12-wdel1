import { NextRequest, NextResponse } from 'next/server';
import { searchUsers } from '../../../services/users.service';

export async function GET(req: NextRequest) {
	// We get the search term from the query parameters
	const searchTerm = req.nextUrl.searchParams?.get('searchTerm');

	// We search for users by the search term
	const users = await searchUsers(searchTerm ?? '');

	// We return the users as a JSON response
	return NextResponse.json(users);
}
