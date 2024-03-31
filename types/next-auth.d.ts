import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * The shape of the user object returned in the OAuth providers
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** Oauth access token */
            id_token?: accessToken;
        } & DefaultSession["user"];
    }
}