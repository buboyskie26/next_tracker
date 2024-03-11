import React from 'react';
import { PrismaClient, Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';
const prisma = new PrismaClient();

interface Props {
  status: Status;
}
//
// Status object is the key
// Object label and color is the value
// If you'd get accessed the key (Status), you`ll get its value (label,color)
//
const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'green' | 'violet' }
> = {
  OPEN: { label: 'Open', color: 'green' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Close', color: 'red' },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
