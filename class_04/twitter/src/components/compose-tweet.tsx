'use client';

import { useState } from 'react';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export default function ComposeTweet() {
	const [value, setValue] = useState('');

	return (
		<div className='flex flex-row p-4 gap-4 border-b-2 border-gray-600'>
			<div>
				<Avatar>
					<AvatarImage
						src='https://github.com/shadcn.png'
						className='w-12 h-12 rounded-full'
					/>
					<AvatarFallback>Avatar</AvatarFallback>
				</Avatar>
			</div>
			<div className='w-full flex flex-col items-end'>
				<Textarea
					className='w-full border-t-0 border-l-0 border-r-0 rounded-none'
					placeholder='What is happening?'
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
				<Button
					className='mt-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white'
					disabled={!value}
					onClick={() => console.log(value)}>
					Post
				</Button>
			</div>
		</div>
	);
}
