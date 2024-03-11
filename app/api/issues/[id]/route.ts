import { NextRequest, NextResponse } from 'next/server';
import { issueSchema, patchIssueSchema } from '@/app/validationSchemas';
// import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { Props } from 'next/script';
import { DialogDescription } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

const prisma = new PrismaClient();

interface IdProps {
  params: { id: string };
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function PUT(request: NextRequest, { params }: IdProps) {
  //
  // Checking users session
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedToUserId, title, description } = body;
  if (body.assignedToUserId) {
    // Check if it has registered in the user db
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: 'Invalid user.' }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: 'Invalid Issue' }, { status: 400 });
  //
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId
    },
  });

  //
  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: IdProps) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: 'Invalid Issue' }, { status: 400 });

  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });

  //
  return NextResponse.json({});
}
