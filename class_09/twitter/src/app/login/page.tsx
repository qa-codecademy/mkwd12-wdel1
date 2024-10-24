import { getServerSession } from 'next-auth';
import LoginForm from './form';
import { redirect } from 'next/navigation';

export default async function Login() {
	const session = await getServerSession();

	if (session) {
		// If the user is logged in, we redirect to the home page
		redirect('/');
	}

	return <LoginForm />;
}
