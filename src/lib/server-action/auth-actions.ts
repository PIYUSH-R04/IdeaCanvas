// "use server";

// import { z } from 'zod';
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
// import { FormSchema } from '../types';
// import { cookies } from 'next/headers';

// export async function actionLoginUser({
//   email,
//   password,
// }: z.infer<typeof FormSchema>) {
//   const supabase = createRouteHandlerClient({ cookies });
//   const response = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
//   return response;
// }

// export async function actionSignUpUser({
//   email,
//   password,
// }: z.infer<typeof FormSchema>) {
//   const supabase = createRouteHandlerClient({ cookies });
//   const { data } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('email', email);

//   if (data?.length) return { error: { message: 'User already exists', data } };
//   const response = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
//     },
//   });
//   return response;
// }



//////////////////////////////
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

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email);

  if (data?.length) return { error: { message: 'User already exists' } };

  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });

  if (response.error) {
    return { error: { message: response.error.message } };
  }

  return response;
}








///////////////////////

// For mock:

////////////

// "use server";

// import { z } from 'zod';
// import { FormSchema } from '../types';

// export async function actionLoginUser({
//   email,
//   password,
// }: z.infer<typeof FormSchema>) {
//   // Mock response for login
//   return { data: { user: { email }, session: { access_token: 'mock_token' } } };
// }

// export async function actionSignUpUser({
//   email,
//   password,
// }: z.infer<typeof FormSchema>) {
//   // Mock response for signup
//   const mockResponse = {
//     data: { user: { email }, session: { access_token: 'mock_token' } },
//   };

//   return mockResponse;
// }
