import NextAuth from "next-auth";
import { User } from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // Google requires "offline" access_type to provide a `refresh_token`
            authorization: { params: { access_type: "offline", prompt: "consent" } },

        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile }) {

            // if (account) {
            //     token.id_token = account.id_token;
            // }
            // return token;
            if (token && account && profile) {
                // First login, save the `access_token`, `refresh_token`, and other
                // details into the JWT

                const userProfile: User = {
                    id: token.sub,
                    name: profile?.name,
                    email: profile?.email,
                    image: token?.picture,
                    ...token.user,
                }

                return {
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    refresh_token: account.refresh_token,
                    user: userProfile,
                    id_token: account.id_token
                }
            }
            else if (Date.now() < token.expires_at * 1000) {
                // Subsequent logins, if the `access_token` is still valid, return the JWT
                if (account) {
                    token.access_token = account.access_token;
                    token.id_token = account.id_token;
                }
                return token
            } else {

                // Subsequent logins, if the `access_token` has expired, try to refresh it
                if (!token.refresh_token) throw new Error("Missing refresh token")

                try {
                    // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
                    // at their `/.well-known/openid-configuration` endpoint.
                    // i.e. https://accounts.google.com/.well-known/openid-configuration
                    const response = await fetch("https://oauth2.googleapis.com/token", {
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: new URLSearchParams({
                            client_id: process.env.GOOGLE_CLIENT_ID!,
                            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                            grant_type: "refresh_token",
                            refresh_token: token.refresh_token! as string,
                        }),
                        method: "POST",
                    })

                    const responseTokens = await response.json()

                    if (!response.ok) throw responseTokens

                    return {
                        // Keep the previous token properties
                        ...token,
                        access_token: responseTokens.access_token,
                        expires_at: Math.floor(Date.now() / 1000 + (responseTokens.expires_in as number)),
                        // Fall back to old refresh token, but note that
                        // many providers may only allow using a refresh token once.
                        refresh_token: responseTokens.refresh_token ?? token.refresh_token,
                    }
                } catch (error) {
                    console.error("Error refreshing access token", error)
                    // The error property can be used client-side to handle the refresh token error
                    return { ...token, error: "RefreshAccessTokenError" as const }
                }
            }
        },
        async session({ session, token, }) {

            if (token && session.user) {
                session.user = token.user as any;
                // session.user.id_token = token.access_token;
                session.user.id_token = token.id_token;
            }

            return session
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    }
});