import React from 'react';

import { Issue, PrismaClient } from '@prisma/client';
// import { notFound } from 'next/navigation';
// import IssueForm from '../../_components/IssueForm';
import dynamic from 'next/dynamic';
import NewEditLoadingPage from './loading';
import { notFound } from 'next/navigation';
const prisma = new PrismaClient();

interface Props {
  params: { id: string };
}

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <NewEditLoadingPage />,
});

//
const EditIssuePage = async ({ params }: Props) => {
  //
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
