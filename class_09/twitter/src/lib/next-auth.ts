import { DefaultSession, getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByUsername } from '../services/users.service';
import bcrypt from 'bcrypt';

// We re-declare the Session interface to add the user id and username to the session
declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			username: string;
		} & DefaultSession['user'];
	}
}

export const options: NextAuthOptions = {
	providers: [
		// We add the credentials provider to the providers array that will be used to authenticate the user with username and password
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {},
				password: {},
			},
			async authorize(credentials) {
				if (!credentials) return null;

				const { username, password } = credentials;

				// We get the user by username
				const user = await getUserByUsername(username);

				// If the user does not exist, we return null
				if (!user) return null;

				// We compare the password with the hashed password
				if (bcrypt.compareSync(password, user.password)) {
					return {
						id: user.id,
						name: user.name,
						email: user.username,
					};
				}

				// If the password is incorrect, we return null
				return null;
			},
		}),
	],
	callbacks: {
		async session({ session, user, token }) {
			return {
				...session,
				user: {
					name: session.user?.name,
					username: session.user?.email,
					id: token.sub,
				},
			};
		},
	},
	pages: {
		signIn: '/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export const getNextServerSession = () => getServerSession(options);
