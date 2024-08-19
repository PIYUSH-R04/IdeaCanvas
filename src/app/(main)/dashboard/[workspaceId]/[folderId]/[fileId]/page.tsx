
// src/app/(main)/dashboard/[workspaceId]/[folderId]/[fileId]/page.tsx
////////////////
import { File, Folder, workspace } from '@/lib/supabase/supabase.types';
import ServerFile from './ServerFile';

interface PageProps {
  // dirDetails: File | Folder | workspace;
  // fileId: string;
  // dirType: 'workspace' | 'folder' | 'file';
  params: { workspaceId: string; folderId: string; fileId: string };
}

const Page: React.FC<PageProps> = ({
  params,
  // dirDetails,
  // dirType,
  // fileId,
}) => {
  return <ServerFile params={params} />;
};

export default Page;
