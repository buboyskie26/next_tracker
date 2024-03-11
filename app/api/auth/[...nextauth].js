import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const clientId =
  '997182019581-otkffueeus1nmff5kcbead6rgs4tgdcf.apps.googleusercontent.com';
const clientSecret = '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';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      // clientId: process.env.GOOGLE_CLIENT_ID,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
});
