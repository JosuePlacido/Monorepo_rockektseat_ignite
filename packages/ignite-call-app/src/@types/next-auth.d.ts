// eslint-disable-next-line unused-imports/no-unused-imports
import NextAuth from 'next-auth';

declare module 'next-auth' {
	export interface User {
		id: string;
		name: string;
		email: string;
		username: string;
		avatar_url: string;
	}
	interface Session {
		user: User;
	}
}
