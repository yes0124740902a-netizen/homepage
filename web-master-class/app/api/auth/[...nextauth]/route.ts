import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createUser } from '@/lib/firestore';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Save user to Firestore on first sign in
      if (user.email && user.name) {
        try {
          const userData = {
            id: user.id || user.email.replace('@', '_').replace(/\./g, '_'),
            name: user.name,
            email: user.email,
            provider: 'google' as const,
            joinDate: new Date().toISOString(),
            grade: 'Silver',
            image: user.image || '',
          };

          await createUser(userData);
        } catch (error) {
          console.error('Error saving user to Firestore:', error);
          // Continue even if Firestore save fails
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // After successful login, redirect to a special page that saves to localStorage
      if (url.includes('/api/auth/callback')) {
        return `${baseUrl}/auth/success`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
