import bcrypt from "bcryptjs";
import dbConnect from "lib/dbConnect";
import UserModel from "model/User";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          value: "test@mail.com",
          placeholder: "sample@mail.com",
        },
        password: {
          label: "Password",
          type: "password",
          value: "Test@1234",
          placeholder: "Test@1234",
        },
      },
      async authorize(credentials: any): Promise<any> {
        console.log("AUTHORIZE");

        await dbConnect();
        try {
          console.log(credentials);
          console.log(credentials.email === "deep@mail.com");

          const user = await UserModel.findOne({
            email: credentials.email,
          });
          console.log(user);
          if (!user) {
            throw new Error("User not found");
          }
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log({ isCorrectPassword });
          if (isCorrectPassword) {
            return user;
          } else {
            throw new Error("Invalid Password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID || "",
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    /*  async redirect({ url, baseUrl }) {
      console.log({ url, baseUrl });

      return baseUrl;
    }, */
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "auth/newUser",
    error: "/auth/sign-in",
    /* signOut: "/auth/signOut", */
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

export default authOptions;
