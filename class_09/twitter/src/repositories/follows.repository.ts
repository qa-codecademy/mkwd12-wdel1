import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { follows } from '../db/schemas/users_follows.schema';

// Repositories are used to interact with the database
// They are used in:
// - Services

export async function create(followerId: string, followeeId: string) {
	return db
		.insert(follows)
		.values({ followerId, followeeId })
		.returning()
		.then(res => res?.[0]);
}

export async function deleteFollow(followerId: string, followeeId: string) {
	return db
		.delete(follows)
		.where(
			and(
				eq(follows.followerId, followerId),
				eq(follows.followeeId, followeeId)
			)
		);
}
