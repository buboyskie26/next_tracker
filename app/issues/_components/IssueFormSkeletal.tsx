import { Box } from '@radix-ui/themes';
import React from 'react';
// Refactired the Skeleton npm with its css file
import Skeleton from '@/app/components/Skeleton';

const IssueFormSkeletal = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeletal;
