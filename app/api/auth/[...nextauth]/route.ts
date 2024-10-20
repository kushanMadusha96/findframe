import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
// import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";
import UserModel from "@/app/models/User";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                const response = await UserModel.findOne({ email: credentials?.email });
                // console.log(response)

                const passwordCorrect = await compare(
                    credentials?.password || "",
                    response.hashedPassword
                );

                if (passwordCorrect) {
                    return {
                        id: response._id,
                        email: response.email,
                        name: response.username
                    };
                }

                console.log("credentials", credentials);
                return null;
            },
        }),
    ],
});

export { handler as GET, handler as POST };