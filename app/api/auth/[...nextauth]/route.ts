import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { cookies } from "next/headers";

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
		} & DefaultSession['user'];
	}
}

export const authOptions: AuthOptions = {
	secret: process.env.NEXTAUTH_SECRET!!,
	adapter: PrismaAdapter(prisma),
	// Configure one or more authentication providers
	providers: [
		// Providers without credentials are interactive and require the user to be present
		GithubProvider({
			clientId: process.env.GITHUB_ID!!,
			clientSecret: process.env.GITHUB_SECRET!!,
		}),
	],
	callbacks: {
		session: ({ session, token, user }) => {
			if (session.user && token) {
				console.log(session, token);
				session.user.id = token.id as string;
			}
			if (user) {
				session.user.id = user.id;
			}
			return session;
		},
	}
}

const handler = NextAuth(authOptions);

export {
	handler as GET,
	handler as POST
};
