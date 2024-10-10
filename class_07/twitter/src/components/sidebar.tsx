import {
	AcademicCapIcon,
	EnvelopeIcon,
	MagnifyingGlassCircleIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Sidebar() {
	return (
		<ol className='flex flex-col gap-3 py-2 h-full'>
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
				<Link href='/profile' className='flex items-center gap-2'>
					<UserCircleIcon className='size-10' />
					Profile
				</Link>
			</li>
			<li>
				<Link
					href={'/feed/compose'}
					className='w-full bg-blue-500 p-4 rounded-full text-center font-bold cursor-pointer block'>
					Post
				</Link>
			</li>
		</ol>
	);
}
