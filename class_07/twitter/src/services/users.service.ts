import { UserCreateModel } from './../db/schemas/user.schema';
import {
	create,
	findById,
	findByUsername,
	update,
} from '../repositories/users.repository';
import {
	create as createFollow,
	deleteFollow,
} from '../repositories/follows.repository';
import bcrypt from 'bcrypt';

export async function getUserByUsername(username: string) {
	return findByUsername(username);
}

export async function getUserById(id: string) {
	return findById(id);
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
		throw new Error('User already exists');
	}

	const userWithEncryptedPassword: UserCreateModel = {
		...userData,
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
