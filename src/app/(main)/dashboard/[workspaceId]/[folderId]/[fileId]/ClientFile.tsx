// // src/app/(main)/dashboard/[workspaceId]/[folderId]/[fileId]/ClientFile.tsx

// 'use client';

// import React, { useState } from 'react';
// import QuillEditor from '@/components/quill-editor/quill-editor';
// import KanbanBoard from '@/components/kanban-board/kanban-board';
// import Canvas from '@/components/canvas/canvas';
// import { File, Folder, workspace } from '@/lib/supabase/supabase.types';
// import { Button } from '../../../../../../components/ui/button';
// // import KanbanBoard from '@/components/kanban-board'; // Assuming you have this component
// // import Canvas from '@/components/canvas'; // Assuming you have this component

// interface ClientFileProps {
//     dirDetails: File | Folder | workspace;
//     fileId: string;
//     dirType: 'workspace' | 'folder' | 'file';
//   }
  
//   const ClientFile: React.FC<ClientFileProps> = ({
//     dirDetails,
//     dirType,
//     fileId,
//   }) => {
//   const [view, setView] = useState<'quill' | 'kanban' | 'canvas'>('quill');

//   const renderView = () => {
//     switch (view) {
//       case 'kanban':
//         return <KanbanBoard fileId={fileId} dirDetails={dirDetails} dirType={'file'}/>;
//       case 'canvas':
//         return <Canvas fileId={fileId} dirDetails={dirDetails} dirType={'file'} />;
//       case 'quill':
//       default:
//         return <QuillEditor dirType="file" fileId={fileId} dirDetails={dirDetails} />;
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

// export default ClientFile;


// src/app/(main)/dashboard/[workspaceId]/[folderId]/[fileId]/ClientFile.tsx

'use client';

import React, { useState } from 'react';
import QuillEditor from '@/components/quill-editor/quill-editor';
import KanbanBoard from '@/components/kanban-board/kanban-board';
import Canvas from '@/components/canvas/canvas';
import { File, Folder, workspace } from '@/lib/supabase/supabase.types';
import { Button } from '../../../../../../components/ui/button';

interface ClientFileProps {
    dirDetails: File | Folder | workspace;
    fileId: string;
    dirType: 'workspace' | 'folder' | 'file';
}

const ClientFile: React.FC<ClientFileProps> = ({
    dirDetails,
    dirType,
    fileId,
}) => {
    const [view, setView] = useState<'quill' | 'kanban' | 'canvas'>('quill');

    const renderView = () => {
        switch (view) {
            case 'kanban':
                return <KanbanBoard fileId={fileId} dirDetails={dirDetails} dirType={'file'} />;
            case 'canvas':
                return <Canvas fileId={fileId} dirDetails={dirDetails} dirType={'file'} />;
            case 'quill':
            default:
                return <QuillEditor dirType="file" fileId={fileId} dirDetails={dirDetails} />;
        }
    };

    return (
        <div className="relative">
            {/* View switcher */}
            <div className="view-switcher">
                <Button variant="outline" className="p-1" onClick={() => setView('quill')}>Quill</Button>
                <Button variant="outline" className="p-1" onClick={() => setView('kanban')}>Kanban</Button>
                <Button variant="outline" className="p-1" onClick={() => setView('canvas')}>Canvas</Button>
            </div>

            {/* Render the selected view */}
            {renderView()}
        </div>
    );
};

export default ClientFile;

