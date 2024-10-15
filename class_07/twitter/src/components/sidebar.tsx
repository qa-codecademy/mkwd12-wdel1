'use client';

import {
	AcademicCapIcon,
	ArrowLeftEndOnRectangleIcon,
	ArrowRightEndOnRectangleIcon,
	EnvelopeIcon,
	MagnifyingGlassCircleIcon,
	UserCircleIcon,
	UserPlusIcon,
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { UserModel } from '../db/schemas/user.schema';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function Sidebar() {
	const { data: session } = useSession();
	const [user, setUser] = useState<UserModel>();

	useEffect(() => {
		if (!session?.user?.username) {
			setUser(undefined);
			return;
		}

		fetch(`http://localhost:3000/api/user/${session.user.username}}`)
			.then(res => res.json())
			.then(resUser => setUser(resUser));
	}, [session]);

	return (
		<ol className='flex flex-col gap-3 py-2 h-full'>
			{session ? (
				<>
					<li>
						<Link href='/' className='flex items-center gap-2'>
							<AcademicCapIcon className='size-10 mb-5' />
						</Link>
					</li>
					<li>
						<Link href='/explore' className='flex items-center gap-2'>
							<MagnifyingGlassCircleIcon className='size-10' />
							Explore
						</Link>
					</li>
					<li>
						<Link href='/messages' className='flex items-center gap-2'>
							<EnvelopeIcon className='size-10' />
							Messages
						</Link>
					</li>
					<li>
						<Link
							href={`/${session.user.username}`}
							className='flex items-center gap-2'>
							<UserCircleIcon className='size-10' />
							Profile
						</Link>
					</li>
					<li className='flex items-center gap-2'>
						<Button
							className='flex items-center gap-2 bg-transparent text-white p-0 hover:bg-transparent'
							onClick={() => signOut()}>
							<ArrowLeftEndOnRectangleIcon className='size-10' />
							Logout
						</Button>
					</li>
					<li>
						<Link
							href={'/feed/compose'}
							className='w-full bg-blue-500 p-4 rounded-full text-center font-bold cursor-pointer block'>
							Post
						</Link>
					</li>
				</>
			) : (
				<>
					<li className='flex items-center gap-2'>
						<Link href='/login' className='flex items-center gap-2'>
							<ArrowRightEndOnRectangleIcon className='size-10' />
							Login
						</Link>
					</li>
					<li className='flex items-center gap-2'>
						<Link href='/register' className='flex items-center gap-2'>
							<UserPlusIcon className='size-10' />
							Register
						</Link>
					</li>
				</>
			)}
		</ol>
	);
}
