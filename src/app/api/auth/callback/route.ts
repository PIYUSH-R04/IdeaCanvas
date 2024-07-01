/**
 * The function handles a GET request to exchange a code for a session and redirects to a dashboard
 * URL.
 * @param {NextRequest} req - The `req` parameter in the `GET` function is of type `NextRequest`, which
 * represents the incoming HTTP request in a Next.js serverless function. It contains information about
 * the request such as headers, URL, method, and query parameters. In the provided code snippet, the
 * `req`
 * @returns A redirect response to the `/dashboard` route is being returned.
 */
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
    const requestUrl = new URL(req.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const supabase = createRouteHandlerClient({ cookies });
        await supabase.auth.exchangeCodeForSession(code);
    }
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}