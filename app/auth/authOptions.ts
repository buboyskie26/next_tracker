import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';

const prisma = new PrismaClient();

type SessionProps = {
  session: any;
  token: any;
};

const clientId =
  '997182019581-otkffueeus1nmff5kcbead6rgs4tgdcf.apps.googleusercontent.com';
const clientSecret = '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';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      // clientId should not return as undefined
      // process.env returns an undefined, so '!', tells that process.env always not undefined
      clientId: clientId!,
      clientSecret: clientSecret!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }: SessionProps) => {
      if (session?.user) {
        session.user.id = token.sub;
        delete session.user.email; // sanitize data for security
      }
      return session;
    },
  },
};
export default authOptions;
