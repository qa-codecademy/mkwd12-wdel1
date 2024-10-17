import { getServerSession } from 'next-auth';
import LoginForm from './form';
import { redirect } from 'next/navigation';

export default async function Login() {
	const session = await getServerSession();

	if (session) {
		redirect('/');
	}

	return <LoginForm />;
}
