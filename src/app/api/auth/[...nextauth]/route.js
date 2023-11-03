import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // async signIn({ account, profile }) {
    //   // check if the user is signing in with Google
    //   if (account.provider === "google") {
    //     if (profile) {
    //       try {
    //         const { data: user } = await axios.post(
    //           `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google`,
    //           {
    //             profile,
    //           }
    //         );
    //         return user;
    //       } catch (error) {
    //         console.error('An error occurred during Google login',error);
    //         throw new Error("An error occurred during Google login");
    //       }
    //     }
    //   }
    //   return true;
    // },

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
        // Check if the user is signing in with Google
        if (token.user.provider === "google") {
          // Set the session as the user object returned from the Google sign-in
          session.user = token.user;
        } else {
          // Set the session for email/password sign-in
          session.user = token.user;
        }
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
