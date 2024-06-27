// export const dynamic = 'force-dynamic';

// import React from 'react';
// import QuillEditor from '@/components/quill-editor/quill-editor';
// import { getFileDetails } from '@/lib/supabase/queries';
// import { redirect } from 'next/navigation';

// const File = async ({ params }: { params: { fileId: string } }) => {
//   const { data, error } = await getFileDetails(params.fileId);
//   if (error || !data.length) redirect('/dashboard');

//   return (
//     <div className="relative ">
//       <QuillEditor
//         dirType="file"
//         fileId={params.fileId}
//         dirDetails={data[0] || {}}
//       />
//     </div>
//   );
// };

// export default File;










// //'use client';
// export const dynamic = 'force-dynamic';

// import React, { useState } from 'react';
// import QuillEditor from '@/components/quill-editor/quill-editor';
// // import KanbanBoard from '@/components/kanban-board'; // Assuming you have this component
// // import Canvas from '@/components/canvas'; // Assuming you have this component
// import { getFileDetails } from '@/lib/supabase/queries';
// import { redirect } from 'next/navigation';
// import KanbanBoard from '@/components/kanban-board/kanban-board';
// import Canvas from '@/components/canvas/canvas';

// const File = async ({ params }: { params: { fileId: string } }) => {
//   const { data, error } = await getFileDetails(params.fileId);
//   if (error || !data.length) redirect('/dashboard');

//   // State to manage the current view
//   const [view, setView] = useState<'quill' | 'kanban' | 'canvas'>('quill');

//   // Function to render the selected view
//   const renderView = () => {
//     switch (view) {
//       case 'kanban':
//         return <KanbanBoard fileId={params.fileId} dirDetails={data[0] || {}} dirType={'file'} />;
//       case 'canvas':
//         return <Canvas fileId={params.fileId} dirDetails={data[0] || {}} dirType={'file'} />;
//       case 'quill':
//       default:
//         return <QuillEditor dirType="file" fileId={params.fileId} dirDetails={data[0] || {}} />;
//     }
//   };

//   return (
//     <div className="relative">
//       {/* View switcher */}
//       <div className="view-switcher">
//         <button onClick={() => setView('quill')}>Quill</button>
//         <button onClick={() => setView('kanban')}>Kanban</button>
//         <button onClick={() => setView('canvas')}>Canvas</button>
//       </div>

//       {/* Render the selected view */}
//       {renderView()}
//     </div>
//   );
// };

// export default File;








// src/app/(main)/dashboard/[workspaceId]/[folderId]/[fileId]/page.tsx

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
