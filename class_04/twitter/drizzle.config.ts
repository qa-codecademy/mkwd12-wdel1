import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: [
		'./src/db/schemas/tweet.schema.ts',
		'./src/db/schemas/user.schema.ts',
	],
	out: '',
	dialect: 'postgresql',
	dbCredentials: {
		host: 'localhost',
		user: 'postgres',
		password: 'postgres',
		database: 'twitter',
		port: 5432,
	},
	verbose: true,
});
