'use client';

import { useEffect } from 'react';

type ChildProps = {
	count: number;
	setCount: (count: number) => void;
};

export default function Child({ count, setCount }: ChildProps) {
	console.log('Child render', count);

	useEffect(() => {
		console.log('Child change on initialization');
	}, []);

	useEffect(() => {
		console.log('Child change tracking on each change');
	});

	useEffect(() => {
		console.log('Child change on count change');
	}, [count]);

	return (
		<div>
			<h1>Child component</h1>
			<h2>Count is: {count}</h2>
			<br />
			<br />
			<button type='button' onClick={() => setCount(count + 1)}>
				Increase Count + 1
			</button>
			<br />
			<br />
			<button type='button' onClick={() => setCount(count - 1)}>
				Decrease Count - 1
			</button>
		</div>
	);
}
