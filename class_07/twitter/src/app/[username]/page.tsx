import Link from 'next/link';
import { getUserByUsername } from '../../services/users.service';
import Image from 'next/image';
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { LinkIcon } from '@heroicons/react/24/outline';
import { getNextServerSession } from '../../lib/next-auth';
import unfollowUserAction from '../actions/unfollow-user.action';
import followUserAction from '../actions/follow-user.action';
import TweetsSection from './(components)/tweets-section';

type ProfileProps = {
	params: { username: string };
};

export default async function Profile({ params: { username } }: ProfileProps) {
	const user = await getUserByUsername(username);
	const currentUser = await getNextServerSession();

	if (!user) {
		return <p>User not found</p>;
	}

	console.log('🚀 ivo-test ~ Profile ~ user:', user);
	const isViewingOwnProfile = currentUser?.user.username === username;

	const isFollowing = user.followers.some(
		followRecord => followRecord.followerId === currentUser?.user.id
	);

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
					{isViewingOwnProfile ? (
						<Link
							className='border-solid border-2 border-white text-sm font-bold shadow-md px-4 py-2 text-white h-10 rounded-full'
							href={`/${username}/edit`}>
							Edit profile
						</Link>
					) : isFollowing ? (
						<form action={unfollowUserAction}>
							<input type='hidden' name='followeeId' value={user.id} />
							<input
								type='hidden'
								name='followerId'
								value={currentUser?.user.id}
							/>
							<button className='border-solid border-2 border-white text-sm font-bold shadow-md px-4 py-2 text-white h-10 rounded-full'>
								Unfollow
							</button>
						</form>
					) : (
						<form action={followUserAction}>
							<input type='hidden' name='followeeId' value={user.id} />
							<input
								type='hidden'
								name='followerId'
								value={currentUser?.user.id}
							/>
							<button className='border-solid border-2 border-white text-sm font-bold shadow-md px-4 py-2 text-white h-10 rounded-full'>
								Follow
							</button>
						</form>
					)}
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
				<div className='flex gap-4 mt-2'>
					<div>
						<span className='font-bold'>{user.following.length ?? 0}</span>{' '}
						<span className='text-slate-400'>Following</span>
					</div>
					<div>
						<span className='font-bold'>{user.followers.length ?? 0}</span>{' '}
						<span className='text-slate-400'>Followers</span>
					</div>
				</div>
			</div>

			<TweetsSection userId={user.id} />
		</div>
	);
}
