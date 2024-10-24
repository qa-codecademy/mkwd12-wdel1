'use client';

import { useEffect, useState } from 'react';
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from '../../../components/ui/command';
import { UserModel } from '../../../db/schemas/user.schema';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function NewMessage() {
	const [users, setUsers] = useState<UserModel[]>([]);
	const [selectedUser, setSelectedUser] = useState<UserModel>();
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState('');
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/users?searchTerm=${searchTerm}`
		)
			.then(res => res.json())
			.then(usersResponse => setUsers(usersResponse));
	}, [searchTerm]);

	const submitMessage = async () => {
		if (!selectedUser || !session) {
			return;
		}

		const messageResponse = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					text: message,
					userA: session.user.id,
					userB: selectedUser.id,
				}),
			}
		);
		const messageResponseParsed = await messageResponse.json();

		// We redirect the user to the conversation page to continue the conversation with additional messages
		router.push('/messages/' + messageResponseParsed.conversationId);
	};

	return (
		<div>
			<Command onChange={(e: any) => setSearchTerm(e.target.value)}>
				<CommandInput placeholder='Search for user to message...' />
				<CommandList>
					<CommandEmpty>No users found.</CommandEmpty>
					{users.map(user => (
						<CommandItem
							key={user.id}
							value={user.id}
							onSelect={() => setSelectedUser(user)}>
							{user.name}
						</CommandItem>
					))}
				</CommandList>
			</Command>

			{selectedUser && (
				<div className='flex flex-col gap-4 items-end p-4'>
					<h1 className='text-xl w-full text-center'>
						New conversation with {selectedUser.name}
					</h1>
					<Textarea
						placeholder='Start conversation...'
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
					<Button disabled={!message} onClick={submitMessage}>
						Send
					</Button>
				</div>
			)}
		</div>
	);
}
