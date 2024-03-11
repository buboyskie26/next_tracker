'use client';
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

// Containis a cache fr storing data that we get from the backend.

const queryClient = new QueryClient();
const QueryClientProvider = ({ children }: PropsWithChildren) => {
  //
  //
  return (
    // This component uses react context to share the queryClient Tree
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
  //
};

export default QueryClientProvider;
