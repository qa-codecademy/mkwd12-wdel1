import Link from 'next/link';
import { getNextServerSession } from '../../../lib/next-auth';
import { getConversationById } from '../../../services/messages.service';
import Image from 'next/image';
import { cn } from '../../../lib/utils';
import { formatDate } from '../../../lib/format-date';
import Chat from './chat';

export const revalidate = 2;

type MessagesProps = {
	params: {
		convoId: string;
	};
};

export default async function Messages({ params: { convoId } }: MessagesProps) {
	const conversation = await getConversationById(convoId);
	const session = await getNextServerSession();

	const otherUser =
		conversation.userA.id === session?.user.id
			? conversation.userB
			: conversation.userA;

	if (!conversation?.messages?.length) {
		return <h1>No messages found</h1>;
	}

	return (
		<div className='p-4'>
			<div className='pb-4 flex flex-col items-center'>
				<Link href={`/${otherUser?.username}`}>
					<div className='w-12 h-12 rounded-full overflow-hidden border-solid border-blue-500 border-2 shadow-md'>
						<Image
							alt='avatar'
							src={otherUser?.avatar || `https://github.com/shadcn.png`}
							width={100}
							height={100}
						/>
					</div>
				</Link>
				<h1 className='text-xl font-bold'>{otherUser?.name}</h1>
				<h2 className='text-slate-600'>@{otherUser?.username}</h2>
			</div>

			<div className='flex flex-col gap-4 overflow-y-auto max-h-screen h-full'>
				{conversation.messages.map(message => (
					<div
						key={message.id}
						className={cn(
							'max-w-1/2',
							message.authorId === session?.user.id ? 'self-end' : 'self-start '
						)}>
						<p
							className={cn(
								'bg-slate-700 p-4 rounded-xl w-full',
								message.authorId === session?.user.id
									? 'rounded-br-sm'
									: 'rounded-bl-sm'
							)}>
							{message.text}
						</p>
						<p className='text-slate-500 text-sm'>
							{formatDate(message.createdAt ?? new Date())}
						</p>
					</div>
				))}
			</div>

			<Chat userId={session?.user.id || ''} receiverId={otherUser.id} />
		</div>
	);
}
