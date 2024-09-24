'use client';

import { useState } from 'react';

export default function ExampleHttp() {
	const [users, setUsers] = useState<{ name: string; age: number }[]>([]);

	return (
		<div>
			<h1>Example Http</h1>

			<button
				type='button'
				onClick={async () => {
					const response = await fetch('http://localhost:3000/api/users');
					const data = await response.json();

					setUsers(data);
				}}>
				Fetch data
			</button>

			<ol>
				{users.map(user => (
					<li key={user.name}>
						{user.name} - {user.age}
					</li>
				))}
			</ol>
		</div>
	);
}
