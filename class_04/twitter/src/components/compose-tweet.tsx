'use client';

import { useEffect, useState } from 'react';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { submitTweet } from '../app/actions/create-tweet.action';
import { useSearchParams } from 'next/navigation';
import { TweetModel } from '../db/schemas/tweet.schema';

type ComposeTweetProps = {
	onSubmit?: () => void;
};

export default function ComposeTweet({
	onSubmit = () => void 0,
}: ComposeTweetProps) {
	const [value, setValue] = useState('');
	const [originalTweet, setOriginalTweet] = useState<TweetModel>();

	const searchParams = useSearchParams();

	useEffect(() => {
		const type = searchParams.get('type');

		if (!type) {
			return;
		}

		const id = searchParams.get('repliedToId');

		fetch(`http://localhost:3000/api/tweets/${id}`)
			.then(res => res.json())
			.then(body => setOriginalTweet(body));

		console.log(type, id);
	}, [searchParams]);

	return (
		<>
			{originalTweet && (
				<div>
					<p className='italic text-slate-400'>{originalTweet.text}</p>
				</div>
			)}
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
				<form
					className='w-full flex flex-col items-end'
					action={async formData => {
						await submitTweet(formData);
						setValue('');
						onSubmit();
					}}>
					<Textarea
						className='w-full border-t-0 border-l-0 border-r-0 rounded-none'
						placeholder='What is happening?'
						name='text'
						value={value}
						onChange={e => setValue(e.target.value)}
					/>
					<Button
						className='mt-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white'
						disabled={!value}>
						Post
					</Button>
				</form>
			</div>
		</>
	);
}
