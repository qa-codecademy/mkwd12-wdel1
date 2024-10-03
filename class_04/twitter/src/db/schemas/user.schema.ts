import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 30 }).notNull(),
	username: varchar('username', { length: 20 }).notNull(),
	password: varchar('password').notNull(),
	joinDate: timestamp('join_date', { withTimezone: true })
		.notNull()
		.defaultNow(),
	url: varchar('url'),
	location: varchar('location'),
	description: varchar('description'),
	avatar: varchar('avatar'),
	createdAt: timestamp('created_at', { withTimezone: true })
		.notNull()
		.defaultNow(),
});
