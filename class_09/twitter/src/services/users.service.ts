import { UserCreateModel } from './../db/schemas/user.schema';
import {
	create,
	findById,
	findByUsername,
	findUsersByName,
	update,
} from '../repositories/users.repository';
import {
	create as createFollow,
	deleteFollow,
} from '../repositories/follows.repository';
import bcrypt from 'bcrypt';

// Services are used to handle business logic
// They are used to validate data, perform calculations, etc.
// They are used in:
// - Controllers (API routes)
// - Middleware (authentication, authorization)
// - Server Components

export async function getUserByUsername(username: string) {
	return findByUsername(username);
}

export async function getUserById(id: string) {
	return findById(id);
}

export async function searchUsers(searchTerm: string) {
	return findUsersByName(searchTerm);
}

export async function loginUser({
	username,
	password,
}: {
	username: string;
	password: string;
}) {
	const existingUser = await getUserByUsername(username);

	if (!existingUser) {
		throw new Error(`Invalid credentials`);
	}

	const isPasswordEqual = bcrypt.compareSync(password, existingUser.password);

	if (!isPasswordEqual) {
		throw new Error(`Invalid credentials`);
	}

	return existingUser;
}

export async function createUser(userData: UserCreateModel) {
	const existingUser = await getUserByUsername(userData.username);

	if (existingUser) {
		// We also need to handle this error better, we should show a 400 page using error.tsx
		throw new Error('User already exists');
	}

	const userWithEncryptedPassword: UserCreateModel = {
		...userData,
		username: userData.username.replace(/@/g, ''),
		password: bcrypt.hashSync(userData.password, 10),
	};

	return create(userWithEncryptedPassword);
}

export async function updateUser(
	id: string,
	userData: Omit<UserCreateModel, 'password'>
) {
	return update(id, userData);
}

export async function followUser(followerId: string, followeeId: string) {
	return createFollow(followerId, followeeId);
}

export async function unfollowUser(followerId: string, followeeId: string) {
	return deleteFollow(followerId, followeeId);
}
