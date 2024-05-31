import { workspace } from '@/lib/supabase/supabase.types';
import React from 'react';


interface WorkspaceDropdownProps {
    privateWorkspaces: workspace[] | [];
    sharedWorkspaces: workspace[] | [];
    collaboratingWorkspaces: workspace[] | [];
    defaultValue: workspace | undefined;
  }

const WorkspaceDropdown = () => {
  return (
    <div>WorkspaceDropdown</div>
  )
}

export default WorkspaceDropdown;