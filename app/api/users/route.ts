import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '@/app/validationSchemas';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { NEXT_ROUTER_STATE_TREE } from 'next/dist/client/components/app-router-headers';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(users);
}
