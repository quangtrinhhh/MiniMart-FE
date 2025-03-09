import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  InActiveAccountError,
  InvalidEmailPasswordError,
} from "./ulils/errors";
import { sendRequest } from "./ulils/api";
import { IUser } from "./types/next-auth";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
          body: { username: credentials.email, password: credentials.password },
        });

        if (res.statusCode === 201) {
          return {
            id: res.data?.user.id,
            name: res.data?.user.name,
            email: res.data?.user.email,
            role: res.data?.user.role,
            access_token: res.data?.access_token,
          };
        } else if (+res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (+res.statusCode === 400) {
          throw new InActiveAccountError();
        } else {
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  pages: {
    signIn: "account/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.user = user as IUser;
        token.access_token = (user as IUser).access_token;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      session.access_token = token.access_token;
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
