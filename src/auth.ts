import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.id_token = account.id_token;
            }
            return token;
        },
        async session({ token, session }) {
            if (session) {
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