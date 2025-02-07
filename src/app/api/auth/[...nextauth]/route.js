import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/connectDB";
import UserModel from "@/models/UserModel";
import { NextAuthOptions } from "next-auth";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "select_account", // Forces Google to show the account selection screen
                },
            },
        }),
    ],
    session: {
        jwt: true, // Use JWT for session management
        maxAge: 60 * 60, // Session expiration in seconds (1 hour)
        updateAge: 60 * 30, // How often the session will be updated in seconds (every 30 minutes)
    },
    callbacks: {
        async signIn({ user }) {
            await dbConnect();
            const existingUser = await UserModel.findOne({ email: user.email });

            if (!existingUser) {
                await UserModel.create({ username: user.name, email: user.email, profilePick: user.image });
            }
            return true;
        },
        async session({ session }) {
            await dbConnect();
            const dbUser = await UserModel.findOne({ email: session.user.email });

            if (dbUser) {
                session.user = dbUser;
            }
            return session;
        },
        async jwt({ token, user }) {
            // Persist user info in JWT token if it's newly created
            if (user) {
                token.email = user.email;
                token.name = user.name;
                token.profilePic = user.image;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }