'use client';

import { useState } from 'react';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { sendMessage } from '../../actions/send-message.action';

type ChatProps = {
	userId: string;
	receiverId: string;
};

export default function Chat({ userId, receiverId }: ChatProps) {
	const [value, setValue] = useState('');

	return (
		<form
			action={async formData => {
				await sendMessage(formData);
				setValue('');
			}}>
			<input type='hidden' name='userA' value={userId} />
			<input type='hidden' name='userB' value={receiverId} />
			<Textarea
				name='text'
				placeholder='Say something...'
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<Button type='submit' disabled={!value}>
				Send
			</Button>
		</form>
	);
}
