'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

// providers are used to wrap the app in a provider to provide the session to the app

export default function Providers({ children }: { children: ReactNode }) {
	return <SessionProvider>{children}</SessionProvider>;
}
