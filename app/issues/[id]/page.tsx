import React from 'react';

import { notFound } from 'next/navigation';
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkDown from 'react-markdown';
import delay from 'delay';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

import { PrismaClient } from '@prisma/client';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import AssigneeSelect from './AssigneeSelect';
const prisma = new PrismaClient();

interface Props {
  // All values from the route are string value as default.
  // We just need to parse into Int
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  //

  const session = await getServerSession();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  // await delay(1200);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', md: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
  //
};

export default IssueDetailPage;
