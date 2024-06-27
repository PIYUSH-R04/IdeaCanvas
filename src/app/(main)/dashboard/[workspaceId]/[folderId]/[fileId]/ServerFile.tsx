// src/app/(main)/dashboard/[workspaceId]/[folderId]/[fileId]/ServerFile.tsx

import React from 'react';
import { getFileDetails } from '@/lib/supabase/queries';
import { redirect } from 'next/navigation';
import ClientFile from './ClientFile'; // Client component to handle view switching

const ServerFile = async ({ params }: { params: { fileId: string } }) => {
  const { data, error } = await getFileDetails(params.fileId);
  if (error || !data.length) redirect('/dashboard');

  return <ClientFile fileId={params.fileId} dirDetails={data[0] || {}} dirType={'file'} />;
};

export default ServerFile;
