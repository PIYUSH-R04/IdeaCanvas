export const dynamic = 'force-dynamic';

//import QuillEditor from '@/components/quill-editor/quill-editor';
import { getWorkspaceDetails } from '@/lib/supabase/queries';
import { redirect } from 'next/navigation';
import React from 'react';

const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
  const { data, error } = await getWorkspaceDetails(params.workspaceId);
  if (error || !data.length) redirect('/dashboard');
  return (
    <div className="relative">
      Hello world! You are in your current workspace!!!
    </div>
  );
};

export default Workspace;