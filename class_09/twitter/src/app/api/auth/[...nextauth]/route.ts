import NextAuth from 'next-auth/next';
import { options } from '../../../../lib/next-auth';

// We create the auth handler, this is the endpoint that NextAuth will use to authenticate the user

const handler = NextAuth(options);

export { handler as GET, handler as POST };
