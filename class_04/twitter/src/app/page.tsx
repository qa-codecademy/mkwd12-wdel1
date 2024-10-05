import { redirect } from 'next/navigation';

export default function Home() {
	redirect('/feed/for-you');

	return <h1>home</h1>;
}
