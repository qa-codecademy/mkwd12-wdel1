import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
	const session = await getServerSession();

	// In this component we check if the user is logged in
	// If the user is not logged in, we redirect to the login page
	// If the user is logged in, we redirect to the feed page where we show the tweets for the user

	if (!session) {
		redirect('/login');
	} else {
		redirect('/feed/for-you');
	}

	// This is a return statement that is never executed
	// It is here to make TypeScript happy
	return <h1>home</h1>;
}
