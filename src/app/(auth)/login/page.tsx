'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/lib/types';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../../public/client1.png';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import Loader from '@/components/global/Loader';
import { actionLoginUser } from '@/lib/server-action/auth-actions';

// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { actionLoginUser } from '@/lib/server-actions/auth-actions';

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', password: '' },
  });

  const isLoading = form.formState.isSubmitting;

/**
 * The onSubmit function handles form submission in a TypeScript React application by logging in the
 * user, resetting the form and displaying an error message if needed, then redirecting to the
 * dashboard.
 * @param formData - The `formData` parameter in the `onSubmit` function is the data submitted by the
 * user through a form. It typically contains the values entered by the user in the form fields.
 */
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await actionLoginUser(formData);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    }
    router.replace('/dashboard');
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError('');
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <Link
          href="/"
          className="
          w-full
          flex
          justify-left
          items-center"
        >
          <Image
            src={Logo}
            alt="next Logo"
            width={50}
            height={50}
          />
          <span
            className="font-semibold
          dark:text-white text-4xl first-letter:ml-2"
          >
            IdeaCanvas.
          </span>
        </Link>
        <FormDescription
          className="
          text-foreground/60"
        >
          An all-In-One Collaborative and Productivity Platform
        </FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              
            </FormItem>
          )}
        ></FormField>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Passcode"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
              
            </FormItem>
          )}
        />
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          type="submit"
          variant="outline"
          className="w-full p-6 b text-xl b bg-purple-800"
          //style={{ backgroundColor: '#6e6494' }}
          size="lg"
          disabled={isLoading}
        >
          {!isLoading ? 'Login' : <Loader />}
        </Button>
        <span className="self-container">
          Dont have an account?{' '}
          <Link
            href="/signup"
            className="text-purple-800"
          >
            Sign Up
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default LoginPage;

// function actionLoginUser(formData: { email: string; password: string; }): { error: any; } | PromiseLike<{ error: any; }> {
//     throw new Error('Function not implemented.');
// }