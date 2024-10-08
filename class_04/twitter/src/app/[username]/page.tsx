import Link from 'next/link';
import { getUserByUsername } from '../../services/users.service';
import Image from 'next/image';
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { LinkIcon } from '@heroicons/react/24/outline';

type ProfileProps = {
	params: { username: string };
};

export default async function Profile({ params: { username } }: ProfileProps) {
	const user = await getUserByUsername(username);

	if (!user) {
		return <p>User not found</p>;
	}

	return (
		<div>
			<div className='p-4'>
				<div className='flex justify-between'>
					<div className='w-[100px] h-[100px] rounded-full overflow-hidden border-solid border-blue-500 border-2 shadow-md'>
						<Image
							alt='avatar'
							src={user.avatar ?? './avatar-default.svg'}
							width={100}
							height={100}
						/>
					</div>
					<Link
						className='border-solid border-2 border-white text-sm font-bold shadow-md px-4 py-2 text-white h-10 rounded-full'
						href={`/${username}/edit`}>
						Edit profile
					</Link>
				</div>

				<h1 className='text-2xl font-bold mt-2'>{user.name}</h1>
				<h2 className='text-slate-400'>@{user.username}</h2>
				{user.description && <p className='mt-2'>{user.description}</p>}
				<div className='flex justify-between mt-2 gap-2'>
					{user.location && (
						<p className='flex items-center gap-1 text-blue-400 hover:underline'>
							<MapPinIcon className='size-5' /> {user.location}
						</p>
					)}
					{user.url && (
						<p className='flex items-center gap-1 text-blue-400 hover:underline'>
							<LinkIcon className='size-5' />{' '}
							<a href={user.url} target='_blank'>
								{user.url}
							</a>
						</p>
					)}
				</div>
				<div>
					{user.joinDate && (
						<p className='flex items-center gap-1 text-slate-400 mt-2'>
							<CalendarDaysIcon className='size-5' />
							Joined {user.joinDate.toDateString()}
						</p>
					)}
				</div>
			</div>

			{/* Tweet section */}
		</div>
	);
}
