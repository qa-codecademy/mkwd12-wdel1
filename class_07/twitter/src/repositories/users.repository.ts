import { eq } from 'drizzle-orm';
import { db } from '../db';
import { UserCreateModel, UserModel, users } from '../db/schemas/user.schema';

export const findByUsername = (username: string) =>
	db.query.users.findFirst({
		where: eq(users.username, username),
	});

export const create = (user: UserCreateModel): Promise<UserModel> =>
	db
		.insert(users)
		.values(user)
		.returning()
		.then(res => res?.[0]);
