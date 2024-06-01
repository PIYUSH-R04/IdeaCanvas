import { useAppState } from '@/lib/providers/state-provider';
import { Folder } from '@/lib/supabase/supabase.types';
import React, { useEffect, useState } from 'react'

interface FoldersDropdownListProps {
    workspaceFolders: Folder[];
    workspaceId: string;
  }

const FoldersDropdownList: React.FC<FoldersDropdownListProps> = ({
    workspaceFolders,
    workspaceId,
  }) => {

    const { state, dispatch, folderId } = useAppState();
    const [folders, setFolders] = useState(workspaceFolders);

    useEffect(() => {
        if (workspaceFolders.length > 0) {
          dispatch({
            type: 'SET_FOLDERS',
            payload: {
              workspaceId,
              folders: workspaceFolders.map((folder) => ({
                ...folder,
                files:
                  state.workspaces
                    .find((workspace) => workspace.id === workspaceId)
                    ?.folders.find((f) => f.id === folder.id)?.files || [],
              })),
            },
          });
        }
      }, [workspaceFolders, workspaceId]);

      useEffect(() => {
        setFolders(
          state.workspaces.find((workspace) => workspace.id === workspaceId)
            ?.folders || []
        );
      }, [state]);


      
    
    return (
    <div>FoldersDropdownList</div>
  )
}

export default FoldersDropdownList;


