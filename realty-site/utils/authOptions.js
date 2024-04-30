import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful signIn
    async signIn({ profile }) {
      // Connect to database
      // Check if user exists
      // If not, add user to database
      //Return true to allow sign in
    },
    // Modifies the session object
    async session({ session }) {
      // Get user from database
      // Assign user Id to the session
      //   return to session
    },
  },
};
