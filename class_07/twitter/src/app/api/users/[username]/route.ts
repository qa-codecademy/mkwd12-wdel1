import { NextApiRequest } from 'next';
import { getUserByUsername } from '../../../../services/users.service';
import { NextResponse } from 'next/server';

export async function GET(
	req: NextApiRequest,
	{ params: { username } }: { params: { username: string } }
) {
	const user = await getUserByUsername(username);

	return NextResponse.json(user);
}
