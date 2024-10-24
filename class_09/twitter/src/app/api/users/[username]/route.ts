import { getUserByUsername } from '../../../../services/users.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	// We get the username from the URL parameters
	{ params: { username } }: { params: { username: string } }
) {
	const user = await getUserByUsername(username);

	return NextResponse.json(user);
}
