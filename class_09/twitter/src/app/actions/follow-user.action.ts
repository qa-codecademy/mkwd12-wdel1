'use server';

// This is an action that is used to follow a user
// Actions are used to perform server-side actions
// They are used to perform actions like creating, updating, or deleting data
// From each action we call a service method where we perform the business logic

import { revalidatePath } from 'next/cache';
import { followUser } from '../../services/users.service';

export default async function followUserAction(formData: FormData) {
	const followerId = formData.get('followerId') as string;
	const followeeId = formData.get('followeeId') as string;

	await followUser(followerId, followeeId);

	// We revalidate the feed page to update the page and show the updated follow status
	revalidatePath('/', 'page');
}
