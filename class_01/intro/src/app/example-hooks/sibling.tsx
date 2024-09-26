'use client';

import { useState } from 'react';

export default function Sibling() {
	console.log('Sibling rendering...');

	const [message, setMessage] = useState('Hello from sibling');

	return (
		<div>
			<h1>Sibling component</h1>
			<p>{message}</p>
			<button onClick={() => setMessage('This is changed message')}>
				Change message
			</button>
		</div>
	);
}
