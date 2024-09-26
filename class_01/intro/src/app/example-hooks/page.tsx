'use client';

import { useState } from 'react';
import Child from './child';
import Sibling from './sibling';

export default function Parent() {
	const [count, setCount] = useState(1);

	console.log('Parent render', count);

	// let count = 1;

	// const setCount = (newCount: number) => {
	// 	console.log(newCount);
	// 	count = newCount;
	// };

	return (
		<>
			<Child count={count} setCount={setCount} />
			<Sibling />
		</>
	);
}

// useMemo
// useCallback
