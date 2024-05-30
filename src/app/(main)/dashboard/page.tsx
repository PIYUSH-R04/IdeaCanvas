import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import db from '@/lib/supabase/db';

import { cookies } from 'next/headers';
import DashboardSetup from '@/components/dashboard-setup/dashboard-setup';
import { redirect } from 'next/navigation';
import { getUserSubscriptionStatus } from '@/lib/supabase/queries';

const DashboardPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
  });

  const { data: subscription, error: subscriptionError } =
  await getUserSubscriptionStatus(user.id);

  if (subscriptionError) return;

  if (!workspace)
    return (
      <div
        className="bg-background
        h-screen
        w-screen
        flex
        justify-center
        items-center
  "
      >
        <DashboardSetup user={user} subscription={subscription}></DashboardSetup>
      </div>
    );

  redirect(`/dashboard/${workspace.id}`);
};

export default DashboardPage;

// import React from 'react'

// const Page = () => {
//   return (
//     <div>Page</div>
//   )
// }

// export default Page;