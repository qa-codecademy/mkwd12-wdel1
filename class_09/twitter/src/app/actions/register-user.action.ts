'use server';

// This is an action that is used to register a new user
// Actions are used to perform server-side actions
// They are used to perform actions like creating, updating, or deleting data
// From each action we call a service method where we perform the business logic

import { redirect } from 'next/navigation';
import { UserCreateModel } from '../../db/schemas/user.schema';
import { createUser } from '../../services/users.service';

export default async function registerUser(formData: FormData) {
	const newUser: UserCreateModel = {
		name: formData.get('name') as string,
		username: formData.get('username') as string,
		password: formData.get('password') as string,
	};

	await createUser(newUser);

	// We redirect the user to the login page
	redirect('/login');
}
