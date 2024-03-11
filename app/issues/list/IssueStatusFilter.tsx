'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
//
// value?, since it can be label: 'All'
// Array of Object with strongly typed
const statuses: { label: string; value?: Status }[] = [
  {
    label: 'All',
  },
  {
    label: 'Open',
    value: 'OPEN',
  },
  {
    label: 'In Progress',
    value: 'IN_PROGRESS',
  },
  {
    label: 'Close',
    value: 'CLOSED',
  },
];
//
const IssueStatusFilter = () => {
  //
  const router = useRouter();
  const searchParams = useSearchParams();
  // console.log(searchParams);

  return (
    <>
      <Select.Root
        // To populate the selected status in the URL
        defaultValue={searchParams.get('status') || ''}
        // This will change the url accodingly to the selected dropdown
        onValueChange={(status) => {
          const params = new URLSearchParams();
          // key is the 'status',  value is the status
          if (status) params.append('status', status);
          //
          if (searchParams.get('orderBy'))
            params.append('orderBy', searchParams.get('orderBy')!);
          //
          // ?status=OPEN&orderBy=status
          const query = params.size ? '?' + params.toString() : '';
          console.log(query);
          // const query = status ? `?status=${status}` : '';
          router.push('/issues/list' + query);
        }}
      >
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value || ''}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default IssueStatusFilter;
