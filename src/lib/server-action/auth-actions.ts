"use server";

import { z } from 'zod';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { FormSchema } from '../types';
import { cookies } from 'next/headers';

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}

/**
 * This TypeScript function is used to sign up a user by checking if the user already exists in a
 * database and then signing them up using Supabase authentication.
 * @param  - The `actionSignUpUser` function takes an object as a parameter with the following
 * properties:
 * @returns The function `actionSignUpUser` returns either an error object with a message stating "User
 * already exists" and the existing user data if the user with the provided email already exists in the
 * 'profiles' table, or it returns the response from the `supabase.auth.signUp` function if the user
 * does not already exist.
 */
export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email);

  if (data?.length) return { error: { message: 'User already exists', data } };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });
  return response;
}