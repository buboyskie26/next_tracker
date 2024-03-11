import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
  return (
    <Flex className="mb-5" justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href={'/issues/new'}>New Issues</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;