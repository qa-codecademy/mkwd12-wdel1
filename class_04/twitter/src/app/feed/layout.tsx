'use client';

import { ReactNode, useState } from 'react';
import { cn } from '../../lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useRouter } from 'next/navigation';

enum TabsValue {
	ForYou = 'for-you',
	Following = 'following',
}

type FeedLayoutProps = {
	children: ReactNode;
};

export default function FeedLayout({ children }: FeedLayoutProps) {
	const [selectedTab, setSelectedTab] = useState<TabsValue>(TabsValue.ForYou);

	const router = useRouter();

	return (
		<Tabs
			defaultValue={TabsValue.ForYou}
			onValueChange={value => {
				setSelectedTab(value as TabsValue);
				router.push(`/feed/${value}`);
			}}>
			<TabsList className='border-b-2 border-gray-600'>
				<TabsTrigger
					value={TabsValue.ForYou}
					className={cn(
						'py-3 px-5',
						selectedTab === TabsValue.ForYou &&
							'font-black border-b-4 border-blue-400',
						selectedTab !== TabsValue.ForYou && 'text-slate-400'
					)}>
					For you
				</TabsTrigger>
				<TabsTrigger
					value={TabsValue.Following}
					className={cn(
						'py-3 px-5',
						selectedTab === TabsValue.Following &&
							'font-black border-b-4 border-blue-400',
						selectedTab !== TabsValue.Following && 'text-slate-400'
					)}>
					Following
				</TabsTrigger>

				<TabsContent value={TabsValue.ForYou}>{children}</TabsContent>
				<TabsContent value={TabsValue.Following}>{children}</TabsContent>
			</TabsList>
		</Tabs>
	);
}
