import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function QueryProvider({ children }: Props) {
	const queryClient = new QueryClient();
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
