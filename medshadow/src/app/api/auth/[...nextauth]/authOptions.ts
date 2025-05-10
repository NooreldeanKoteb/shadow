import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

const authOptions: AuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          await connectToDatabase();

          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            console.log("User not found:", credentials.email);
            throw new Error("Invalid email or password");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log("Invalid password for user:", credentials.email);
            throw new Error("Invalid email or password");
          }

          console.log("Login successful for:", credentials.email);
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "google") {
          // Handle Google sign in
          await connectToDatabase();
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            // Create new user if doesn't exist
            await User.create({
              email: user.email,
              name: user.name,
              role: "student", // Default role for Google sign-in
              password: await bcrypt.hash(Math.random().toString(36), 10), // Random password for Google users
            });
          }
        }
        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
          token.role = user.role;
        }
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (token) {
          session.user.id = token.id;
          session.user.role = token.role;
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions }; 