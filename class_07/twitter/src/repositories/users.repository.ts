import { eq } from 'drizzle-orm';
import { db } from '../db';
import { UserCreateModel, UserModel, users } from '../db/schemas/user.schema';

export const findByUsername = (username: string) =>
	db.query.users.findFirst({
		where: eq(users.username, username),
		with: {
			followers: true,
			following: true,
		},
	});

export const create = (user: UserCreateModel): Promise<UserModel> =>
	db
		.insert(users)
		.values(user)
		.returning()
		.then(res => res?.[0]);

export const update = (
	id: string,
	userData: Omit<UserCreateModel, 'password'>
) =>
	db
		.update(users)
		.set(userData)
		.where(eq(users.id, id))
		.returning()
		.then(res => res?.[0]);
