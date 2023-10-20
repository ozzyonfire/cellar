import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
	// Configure one or more authentication providers
	providers: [
		// Providers without credentials are interactive and require the user to be present
		GithubProvider({
			clientId: process.env.GITHUB_ID!!,
			clientSecret: process.env.GITHUB_SECRET!!,
		}),
	],
});

export {
	handler as GET,
	handler as POST
}