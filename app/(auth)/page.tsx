'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ArrowRight, Loader } from 'lucide-react';
import { z } from 'zod';
import Link from 'next/link';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { loginMutation } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Login() {
	const { mutate, isPending } = useMutation({
		mutationFn: loginMutation,
	});

	const router = useRouter();
	const formSchema = z.object({
		email: z.string().trim().email().min(1, {
			message: 'Email is required',
		}),
		password: z.string().trim().min(6, {
			message: 'Minimum length is six',
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutate(values, {
			onSuccess: (response) => {
				if (response.data.mfaRequired) {
					router.replace(`/verify-mfa?email=${values.email}`);
				}
				router.replace('/home');
			},
			onError: (error: any) => {
				console.log(error);
				const message =
					error?.response?.data?.message || error.message || 'Something went wrong';
				toast.error('Error', {
					description: message,
				});
			},
		});
	};

	return (
		<main className='w-full min-h-[590px] h-auto max-w-full pt-10'>
			<div className='w-full h-full p-5 rounded-md'>
				<Logo />

				<h1 className='text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8 text-center sm:text-left'>
					Log in to Squeezy
				</h1>
				<p className='mb-8 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal'>
					Don't have an account?{' '}
					<Link
						className='text-primary'
						href='/signup'>
						Sign up
					</Link>
					.
				</p>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='mb-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='dark:text-[#f1f7feb5] text-sm'>
											Email
										</FormLabel>
										<FormControl>
											<Input
												placeholder='subscribeto@channel.com'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='mb-4'>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='dark:text-[#f1f7feb5] text-sm'>
											Password
										</FormLabel>
										<FormControl>
											<Input
												placeholder='••••••••••••'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='mb-4 flex w-full items-center justify-end'>
							<Link
								className='text-sm dark:text-white'
								href={`/forget-password?email=${form.getValues().email}`}>
								Forgot your password?
							</Link>
						</div>
						<Button
							className='w-full text-[15px] h-[40px] text-white font-semibold'
							type='submit'
							disabled={isPending}>
							{isPending && <Loader className='animate-spin' />}
							Sign in
							<ArrowRight />
						</Button>

						<div className='mb-6 mt-6 flex items-center justify-center'>
							<div
								aria-hidden='true'
								className='h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]'
								data-orientation='horizontal'
								role='separator'></div>
							<span className='mx-4 text-xs dark:text-[#f1f7feb5] font-normal'>
								OR
							</span>
							<div
								aria-hidden='true'
								className='h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]'
								data-orientation='horizontal'
								role='separator'></div>
						</div>
					</form>
				</Form>
				<Button
					variant='outline'
					className='w-full h-[40px]'>
					Email magic link
				</Button>
				<p className='text-xs dark:text-slate- font-normal mt-7'>
					By signing in, you agree to our{' '}
					<a
						className='text-primary hover:underline'
						href='#'>
						Terms of Service
					</a>{' '}
					and{' '}
					<a
						className='text-primary hover:underline'
						href='#'>
						Privacy Policy
					</a>
					.
				</p>
			</div>
		</main>
	);
}
