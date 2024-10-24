'use server';

// This is an action that is used to edit a user profile
// Actions are used to perform server-side actions
// They are used to perform actions like creating, updating, or deleting data
// From each action we call a service method where we perform the business logic

import { redirect } from 'next/navigation';
import { UserCreateModel } from '../../db/schemas/user.schema';
import { updateUser } from '../../services/users.service';

export default async function editUserAction(formData: FormData) {
	const id = formData.get('id') as string;

	const user: Omit<UserCreateModel, 'password'> = {
		name: formData.get('name') as string,
		username: formData.get('username') as string,
		location: formData.get('location') as string,
		url: formData.get('url') as string,
		avatar: formData.get('avatar') as string,
		description: formData.get('description') as string,
	};

	await updateUser(id, user);

	// We redirect the user to their profile page
	redirect(`/${user.username}`);
}
