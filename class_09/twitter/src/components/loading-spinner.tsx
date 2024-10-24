import { ArrowPathIcon } from '@heroicons/react/24/outline';

// This is a loading spinner component that is used to show a loading spinner

export default function LoadingSpinner() {
	return (
		<div className='flex flex-col items-center justify-center h-full w-full'>
			<ArrowPathIcon className='animate-spin text-slate-500 h-40 w-40' />
		</div>
	);
}
