import { getServerSession } from 'next-auth';
import LoginForm from './form';
import { redirect } from 'next/navigation';

export default async function Login() {
	const session = await getServerSession();
	console.log('🚀 ivo-test ~ Login ~ session:', session);

	if (session) {
		redirect('/');
	}

	return <LoginForm />;
}
