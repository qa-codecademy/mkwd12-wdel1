'use client';

import { useSession } from 'next-auth/react';
import { ConversationExtendedModel } from '../../db/schemas/conversations.schema';
import Image from 'next/image';
import { formatDate } from '../../lib/format-date';

type ConvoItemProps = {
	conversation: ConversationExtendedModel;
};

export default function ConvoItem({ conversation }: ConvoItemProps) {
	const { data: session } = useSession();

	// We get the other user in the conversation is the one that is not the current user
	const otherUser =
		conversation.userA.id === session?.user.id
			? conversation.userB
			: conversation.userA;

	// We get the last message in the conversation to show preview of the last conversation
	const message = conversation.messages[conversation.messages.length - 1];

	// We return a div that contains the avatar of the other user and the conversation preview
	return (
		<div className='flex flex-row border-b-[1px] border-gray-600 cursor-pointer'>
			<div className='flex items-center justify-center p-2'>
				<div className='w-10 h-10 rounded-full overflow-hidden border-solid border-blue-500 border-2 shadow-md'>
					<Image
						alt='avatar'
						width={40}
						height={40}
						src={otherUser.avatar ?? `https://github.com/shadcn.png`}
					/>
				</div>
			</div>
			<div className='p-2 flex flex-col justify-center'>
				<div className='flex flex-row gap-2 items-center text-sm'>
					<h1 className='font-bold'>{otherUser.name}</h1>
					<p className='text-slate-600'>@{otherUser.username}</p>
					<p className='text-slate-600'>{formatDate(message.createdAt)}</p>
				</div>
				<p className='text-sm'>{message.text.slice(0, 30) + '...'}</p>
			</div>
		</div>
	);
}
