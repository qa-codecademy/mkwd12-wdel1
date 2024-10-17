'use server';

import { revalidatePath } from 'next/cache';
import { followUser } from '../../services/users.service';

export default async function followUserAction(formData: FormData) {
	const followerId = formData.get('followerId') as string;
	const followeeId = formData.get('followeeId') as string;

	await followUser(followerId, followeeId);

	revalidatePath('/', 'page');
}
