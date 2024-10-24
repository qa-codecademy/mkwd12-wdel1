import { defineConfig } from 'drizzle-kit';

// This is the drizzle config file
// It is used to generate the SQL schema for the database
// Always remember to add your new schema files here
// Run db:push to push the schema to the database
// Run db:studio to open the database studio in the browser (drizzle studio)

export default defineConfig({
	schema: [
		'./src/db/schemas/tweet.schema.ts',
		'./src/db/schemas/user.schema.ts',
		'./src/db/schemas/users_follows.schema.ts',
		'./src/db/schemas/users_liked_tweets.ts',
		'./src/db/schemas/conversations.schema.ts',
		'./src/db/schemas/messages.schema.ts',
	],
	out: '',
	dialect: 'postgresql',
	dbCredentials: {
		host: process.env.q_DB_HOST!,
		user: process.env.q_DB_USER!,
		password: process.env.q_DB_PASSWORD!,
		database: process.env.q_DB_DATABASE!,
		port: parseInt(process.env.q_DB_PORT!),
		ssl: true,
	},
	verbose: true,
	tablesFilter: [`${process.env.q_DB_PREFIX!}_.*`],
	strict: true,
});

// DB_PREFIX is used to prefix the table names in the database
// It is used to avoid conflicts with other databases
// Vercel Postgres allows us to have a single database per (free) account, so this is used to avoid conflicts
// Example: q_users, portfolio_users, sedc_users....
