import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
	const session = await getServerSession();
	console.log('🚀 ivo-test ~ Home ~ session:', session);

	// if (!session) {
	// 	redirect('/login');
	// } else {
	redirect('/feed/for-you');
	// }

	return <h1>home</h1>;
}
