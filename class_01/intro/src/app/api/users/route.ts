import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(request: NextApiRequest, response: NextApiResponse) {
	const users = [
		{ name: 'John', age: 20 },
		{ name: 'Jane', age: 22 },
		{ name: 'Bob', age: 24 },
	];

	return NextResponse.json(users);
}

// export async function PUT() {}
