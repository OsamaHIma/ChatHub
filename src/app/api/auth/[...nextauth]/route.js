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

        try {
          const { data: user } = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
            {
              email,
              password,
            }
          );
          
          if (!user) {
            throw new Error("No user provided for sign in");
          }
          
          return user;
        } catch (error) {
          if (error.response && error.response.status === 401) {
            throw new Error(error.response.data.message);
          } else {
            throw new Error("An error occurred during login");
          }
        }
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
