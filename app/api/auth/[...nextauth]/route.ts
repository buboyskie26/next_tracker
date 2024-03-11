//
//

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth'; // Assuming this is the correct import path for NextAuthOptions

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import authOptions from '@/app/auth/authOptions';

const prisma = new PrismaClient();
// We used this to access the session using userServerSession from the server
const handler = NextAuth(authOptions);

//
export { handler as GET, handler as POST };
