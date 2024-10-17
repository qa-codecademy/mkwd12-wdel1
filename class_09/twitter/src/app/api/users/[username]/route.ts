import { getUserByUsername } from '../../../../services/users.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params: { username } }: { params: { username: string } }
) {
	const user = await getUserByUsername(username);

	return NextResponse.json(user);
}
