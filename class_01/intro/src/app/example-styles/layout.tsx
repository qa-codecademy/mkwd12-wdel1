import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return <div className='bg-green-500 h-screen p-10'>{children}</div>;
}
