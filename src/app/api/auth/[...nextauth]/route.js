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
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
          {
            email,
            password,
          },
        );
        // console.log("user",user)
        if (!user) {
          throw new Error("No user provided for sing in");
        }
        return user;
      },
    }),
  ],

  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session };
      }
      
      if (user) {
        return { ...token, ...user };
      }
      
      return token;
    },
    session({ session, token }) {
      if (token && token.user) {
        session.user = token.user; // Update session.user with the updated user data
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
