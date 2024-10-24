import Link from 'next/link';
import { getNextServerSession } from '../../lib/next-auth';
import { getConversations } from '../../services/messages.service';
import ConvoItem from './convo-item';

export default async function Messages() {
	const session = await getNextServerSession();

	// Realistically we should never get here, because we redirect to the login page if the user is not logged in
	// but we add this check anyway to make TypeScript happy
	if (!session?.user.id) {
		return;
	}

	const conversations = await getConversations(session?.user.id);

	return (
		<div className='flex flex-col flex-nowrap mt-2'>
			<div className='w-full flex flex-row justify-end pr-2'>
				<Link
					className='bg-white text-black px-4 py-2 rounded-md'
					href='/messages/new'>
					New message
				</Link>
			</div>
			{/* We check if there are any conversations and if there are, we map over them and render a list item for each conversation */}
			{!!conversations?.length && (
				<ul className='min-h-screen h-full'>
					{conversations?.map(convo => (
						<Link key={convo.id} href={`/messages/${convo.id}`}>
							<ConvoItem conversation={convo} />
						</Link>
					))}
				</ul>
			)}
		</div>
	);
}
