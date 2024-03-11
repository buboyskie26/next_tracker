import React from 'react';
import { Button, Table } from '@radix-ui/themes';
// import Link from 'next/link';
// import Link from '../components/Link';
// import IssueStatusBadge from '../components/IssueStatusBadge';

import { Link, IssueStatusBadge } from '@/app/components';
import NextLink from 'next/link';
import { PrismaClient, Status, Issue } from '@prisma/client';
const prisma = new PrismaClient();

import delay from 'delay';
import IssueActions from './IssueActions';
import dynamic from 'next/dynamic';
import { ArrowDownIcon, ArrowUpIcon, ValueIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';

interface Props {
  searchParams: { page: string; status: Status; orderBy: keyof Issue };
}
//

export default async function IssuesPage({ searchParams }: Props) {
  //
  const statuses = Object.values(Status);

  // Type safe for Issue columns
  const columns: { label: string; value: keyof Issue }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status' },
    { label: 'Created', value: 'createdAt' },
  ];
  //
  //
  // If undefined, Prisma will not include the status as part of filtering.
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  // console.log(statuses);
  // Note that in prisma, if undefined, it will not include the filter

  // const orderBy = searchParams.orderBy
  //   ? {
  //       [searchParams.orderBy]: 'asc',
  //     }
  //   : undefined;

  // Making sure the orderBy is included in the Object of Issue * Hover the .includes
  const orderBy = columns.map((w) => w.value).includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: 'asc',
      }
    : undefined;

  // For Pagination

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 3;
  const issues = await prisma.issue.findMany({
    where: { status: status },
    // orderBy: {
    //   // title: 'asc' ( Hard-Coded Approach )
    //   [searchParams.orderBy]: 'asc',
    // },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  // Get the total number of issues
  const issueCount = await prisma.issue.count({ where: { status } });

  // console.log(searchParams.status);
  //   console.log(issues);
  // await delay(1000);

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {/* HARD CODED Column */}
            {/* <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell> */}

            {columns.map((column) => (
              <Table.ColumnHeaderCell>
                {/* Problem is that the filtering and sorting is overriding each other */}
                {/* <NextLink href={`/issues/list?orderBy=${column.value}`}> */}
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                    // query: { ...searchParams },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        {/*  */}
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  // className="text-violet-600 hover:underline"
                  href={`/issues/${issue.id}`}
                >
                  {issue.title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
}
