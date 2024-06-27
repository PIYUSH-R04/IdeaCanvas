import { File, Folder, workspace } from '@/lib/supabase/supabase.types';
import React from 'react';

interface CanvasProps {
    dirDetails: File | Folder | workspace;
    fileId: string;
    dirType: 'workspace' | 'folder' | 'file';
  }
  
  const Canvas: React.FC<CanvasProps> = ({
    dirDetails,
    dirType,
    fileId,
  }) => {
  return (
    <div className="canvas">
      {/* Canvas implementation */}
      <h2>Canvas</h2>
      <p>File ID: {fileId}</p>
      <p>Data: {dirDetails.data}</p>
    </div>
  );
};

export default Canvas;
