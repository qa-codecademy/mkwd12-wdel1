'use server';

// This is an action that is used to login a user
// Actions are used to perform server-side actions
// They are used to perform actions like creating, updating, or deleting data
// From each action we call a service method where we perform the business logic

import { redirect } from 'next/navigation';
import { loginUser as login } from '../../services/users.service';

export default async function loginUser(formData: FormData) {
	const loginData = {
		username: formData.get('username') as string,
		password: formData.get('password') as string,
	};

	await login(loginData);

	// We redirect the user to their profile page
	redirect(`/${formData.get('username')}`);
}
