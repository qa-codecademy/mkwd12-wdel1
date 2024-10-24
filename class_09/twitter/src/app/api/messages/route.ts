import { NextRequest, NextResponse } from 'next/server';
import { createMessage } from '../../../services/messages.service';

export async function POST(req: NextRequest) {
	const body = await req.json();

	const message = await createMessage(body);

	return NextResponse.json(message);
}
