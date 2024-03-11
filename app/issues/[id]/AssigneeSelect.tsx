'use client';
import { Select } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { Issue, User } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '@/app/components/Skeleton';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  //
  //   We used react query to cache the list of users in the client side
  const { data: users, error, isLoading } = useUsers();

  // As the page load, it only shows skeleton
  if (isLoading) return <Skeleton />;
  // This will not show up in the browser
  if (error) return null;

  console.log(users);
  //
  //

  const onChangeHandler = async (userId: string) => {
    try {
      await axios.put(`/api/issues/${issue.id}`, {
        // We only put the assignedToUserId
        // From the {} = body in our API backend
        // If userId is truthy, use it, else, set it to null
        assignedToUserId: userId || null,
        // assignedToUserId: !userId ? null : userId,
      });
    } catch (error) {
      toast.error('Changes could not be saved');
    }
  };
  //
  //
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={(userId) => onChangeHandler(userId)}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

// Used for fetching data
// React query itself doesntfetch data instead,
// It uses queryFn to fetch the data and store it in its cache
const useUsers = () =>
  //
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,

    // Issue, we dont have error handling, what if the call in the backend fails
    //   const [users, setUsers] = useState<User[]>([]);

    //   useEffect(() => {
    //     //
    //     async function fetchUsers() {
    //       const { data } = await axios.get<User[]>('/api/users');
    //       setUsers(data);
    //     }

    //     fetchUsers();
    //   }, []);

    //
  });
export default AssigneeSelect;
