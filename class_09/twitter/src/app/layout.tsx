import type { Metadata } from 'next';
import './globals.css';
import { cn } from '../lib/utils';
import { Inter } from 'next/font/google';
import Sidebar from '../components/sidebar';
import Providers from './providers';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'Q',
	description: 'Twitter clone',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased dark',
					inter.variable
				)}>
				<Providers>
					<main className='min-h-screen flex flex-col items-center'>
						<article className='flex flex-row max-v-[800px] w-full h-screen'>
							<section className='w-80 p-2'>
								<Sidebar />
							</section>
							<section className='w-full border-grad-600 border-l-2 p-0 border-r-2'>
								{children}
							</section>
						</article>
					</main>
				</Providers>
			</body>
		</html>
	);
}
