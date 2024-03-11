'use client';
import Skeleton from '@/app/components/Skeleton';
import Link from 'next/link';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';

export default function Navbar() {
  const { status, data: session } = useSession();

  // const { id, email, name, image } = session.user;

  console.log(session);
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex gap="3" className="items-center">
            <Link href={'/'}>
              <AiFillBug />
            </Link>

            <NavLinks />
          </Flex>

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}
const NavLinks = () => {
  //
  const currentPath = usePathname();

  const links = [
    {
      label: 'Dashboard',
      href: '/',
    },
    {
      label: 'Issues',
      href: '/issues/list',
    },
  ];

  return (
    <ul className=" flex space-x-6">
      {links.map((w, index) => (
        <li key={index}>
          <Link
            // className={`${
            //   w.href === currentPath ? 'text-zinc-900 ' : 'text-zinc-500 '
            // } hover: text-zinc-500 transition-colors`}

            className={classnames({
              'text-zinc-900': w.href === currentPath,
              'text-zinc-500': w.href !== currentPath,
              'hover: text-zinc-500 transition-colors`': true,
            })}
            href={w.href}
          >
            {w.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return <Skeleton width="3rem" />;
  }
  if (status === 'unauthenticated') {
    return <Link href={'/api/auth/signin'}>Sign in</Link>;
  }
  //

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            src={session!.user!.image!}
            fallback="?"
            radius="full"
            size="2"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={'/api/auth/signout'}>Sign out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
