import { db } from '../db';
import { follows } from '../db/schemas/users_follows.schema';

export async function create(followerId: string, followeeId: string) {
	return db
		.insert(follows)
		.values({ followerId, followeeId })
		.returning()
		.then(res => res?.[0]);
}

// export async function delete(followerId: string, followeeId: string) {

// }
