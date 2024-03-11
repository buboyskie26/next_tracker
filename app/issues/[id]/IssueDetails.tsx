import { IssueStatusBadge } from '@/app/components';
import { Card, Heading } from '@radix-ui/themes';
import ReactMarkDown from 'react-markdown';
import React from 'react';
import { Issue, PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

interface Props {
  issue: Issue;
}

const IssueDetails = ({ issue }: Props) => {
  return (
    <>
      <Heading>{issue.title}</Heading>{' '}
      <div className="flex space-x-3 my-2">
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </div>
      <Card className="prose mt-4 max-w-full">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;
