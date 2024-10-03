'use client';

import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Tabs } from './ui/tabs';
import ForYou from './for-you';
import Following from './following';
import { cn } from '../lib/utils';
import { useState } from 'react';

enum TabsValue {
	ForYou = 'for-you',
	Following = 'following',
}

export default function Feed() {
	const [selectedTab, setSelectedTab] = useState<TabsValue>(TabsValue.ForYou);

	return (
		<Tabs
			defaultValue={TabsValue.ForYou}
			onValueChange={value => setSelectedTab(value as TabsValue)}>
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

				<TabsContent value={TabsValue.ForYou}>
					<ForYou />
				</TabsContent>
				<TabsContent value={TabsValue.Following}>
					{/* <Following /> */}
				</TabsContent>
			</TabsList>
		</Tabs>
	);
}
