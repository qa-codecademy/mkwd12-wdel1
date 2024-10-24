import { NextRequest, NextResponse } from 'next/server';

// Api folder is used to create API routes for the app
// Each file in the api folder is treated as an API endpoint
// The file name is the path of the API route
// we can create methods like GET, POST, PUT, DELETE, etc. by naming the functions GET, POST, PUT, DELETE, etc.

// API health check
export async function GET(req: NextRequest) {
	return NextResponse.json({ message: 'Health check passed' });
}
