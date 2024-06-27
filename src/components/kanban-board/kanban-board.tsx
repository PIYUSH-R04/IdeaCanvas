import { File, Folder, workspace } from '@/lib/supabase/supabase.types';
import React from 'react';


interface KanbanBoardProps {
    dirDetails: File | Folder | workspace;
    fileId: string;
    dirType: 'workspace' | 'folder' | 'file';
  }
  
  const KanbanBoard: React.FC<KanbanBoardProps> = ({
    dirDetails,
    dirType,
    fileId,
  }) => {
  return (
    <div className="kanban-board">
      {/* Kanban board implementation */}
      <h2>Kanban Board</h2>
      <p>File ID: {fileId}</p>
      <p>Data: {dirDetails.data}</p>
    </div>
  );
};

export default KanbanBoard;
