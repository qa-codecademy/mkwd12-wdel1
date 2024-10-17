'use client';

import { useEffect, useState } from 'react';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { submitTweet } from '../app/actions/create-tweet.action';
import { useSearchParams } from 'next/navigation';
import { TweetModel } from '../db/schemas/tweet.schema';
import { TweetType } from '../types/tweet-type.enum';
import { submitReply } from '../app/actions/reply.action';
import { useSession } from 'next-auth/react';
import { UserModel } from '../db/schemas/user.schema';
import LoadingSpinner from './loading-spinner';

type ComposeTweetProps = {
	onSubmit?: () => void;
};

export default function ComposeTweet({
	onSubmit = () => void 0,
}: ComposeTweetProps) {
	const [value, setValue] = useState('');
	const [originalTweet, setOriginalTweet] = useState<TweetModel>();
	const [type, setType] = useState<TweetType>(TweetType.Tweet);
	const [repliedToId, setRepliedToId] = useState('');
	const { data: session } = useSession();
	const [user, setUser] = useState<UserModel>();

	const searchParams = useSearchParams();

	useEffect(() => {
		if (!session?.user?.username) {
			return;
		}

		fetch(`http://localhost:3000/api/users/${session.user.username}`)
			.then(res => res.json())
			.then(resUser => setUser(resUser));

		const typeParam = searchParams.get('type');

		setType((typeParam as TweetType) || TweetType.Tweet);

		const id = searchParams.get('repliedToId');

		if (type === TweetType.Reply && id) {
			setRepliedToId(id);
			fetch(`http://localhost:3000/api/tweets/${id}`)
				.then(res => res.json())
				.then(body => setOriginalTweet(body));
		} else {
			setRepliedToId('');
			setOriginalTweet(undefined);
		}
	}, [searchParams, type, session?.user?.username]);

	if (!user) {
		return <LoadingSpinner />;
	}

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
							src={user.avatar ?? `https://github.com/shadcn.png`}
							className='w-12 h-12 rounded-full'
						/>
						<AvatarFallback>Avatar</AvatarFallback>
					</Avatar>
				</div>
				<form
					className='w-full flex flex-col items-end'
					action={async formData => {
						if (type === TweetType.Tweet) {
							await submitTweet(formData);
						}

						if (type === TweetType.Reply) {
							await submitReply(formData);
						}

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
					<input type='hidden' name='repliedToId' value={repliedToId} />
					<input type='hidden' name='authorId' value={session?.user.id} />
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
