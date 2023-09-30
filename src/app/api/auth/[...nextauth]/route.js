import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;

        const { data: user } = await axios.post(
          `${process.env.BASE_URL}/api/auth/login`,
          {
            email,
            password,
          },
        );
        console.log("user",user)
        if (!user) {
          throw new Error("No user provided for sing in");
        }
        return { token: user.token, ...user };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      /* Step 1: update the token based on the user object update token for backend  */
      if (user) {
        token.token = user.token;
        token.user = { ...user };
      }
      return token;
    },
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object update session for frontend */
      if (token && session.user) {
        session.user.token = token.token;
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
