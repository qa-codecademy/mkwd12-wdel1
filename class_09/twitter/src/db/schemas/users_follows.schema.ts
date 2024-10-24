import { pgTable, uuid, primaryKey, pgTableCreator } from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

const createTable = pgTableCreator(
	name => `${process.env.q_DB_PREFIX!}_${name}`
);

export const follows = createTable(
	'follows',
	{
		// followerId is the user that is following the followee
		followerId: uuid('follower_id')
			.notNull()
			.references(() => users.id),
		// followeeId is the user that is being followed by the follower
		followeeId: uuid('followee_id')
			.notNull()
			.references(() => users.id),
	},
	t => ({
		// same as in plain SQL, the primary key is a combination of the two columns in a many-to-many relation
		pk: primaryKey({ columns: [t.followerId, t.followeeId] }),
	})
);

export const usersFollowersRelations = relations(follows, ({ one }) => ({
	// follower is the user that is following the followee
	follower: one(users, {
		fields: [follows.followerId],
		references: [users.id],
		relationName: 'follows',
	}),
	// followee is the user that is being followed by the follower
	followee: one(users, {
		fields: [follows.followeeId],
		references: [users.id],
		relationName: 'followers',
	}),
}));

export type FollowModel = InferSelectModel<typeof follows>;
export type FollowCreateModel = InferInsertModel<typeof follows>;
