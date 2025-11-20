'use client';
import { ReactNode, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: ReactNode;
}

export default function QueryProvider({ children }: Props) {
  const clientRef = useRef<QueryClient>();

  if (!clientRef.current) {
    clientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={clientRef.current}>
      {children}
    </QueryClientProvider>
  );
}
