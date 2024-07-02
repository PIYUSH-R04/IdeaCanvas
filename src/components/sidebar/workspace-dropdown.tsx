// 'use client';
// import { useAppState } from '@/lib/providers/state-provider';
// import { workspace } from '@/lib/supabase/supabase.types';
// import React, { useEffect, useState } from 'react';
// import SelectedWorkspace from './selected-workspace';
// import CustomDialogTrigger from '../global/custom-dialog-trigger';
// import WorkspaceCreator from '../global/workspace-creator';
// //import WorkspaceCreator from '../global/workspace-creator';

// interface WorkspaceDropdownProps {
//   privateWorkspaces: workspace[] | [];
//   sharedWorkspaces: workspace[] | [];
//   collaboratingWorkspaces: workspace[] | [];
//   defaultValue: workspace | undefined;
// }

// const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({
//   privateWorkspaces,
//   collaboratingWorkspaces,
//   sharedWorkspaces,
//   defaultValue,
// }) => {
//   const { dispatch, state } = useAppState();
//   const [selectedOption, setSelectedOption] = useState(defaultValue);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (!state.workspaces.length) {
//       dispatch({
//         type: 'SET_WORKSPACES',
//         payload: {
//           workspaces: [
//             ...privateWorkspaces,
//             ...sharedWorkspaces,
//             ...collaboratingWorkspaces,
//           ].map((workspace) => ({ ...workspace, folders: [] })),
//         },
//       });
//     }
//   }, [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces]);

//   const handleSelect = (option: workspace) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     const findSelectedWorkspace = state.workspaces.find(
//       (workspace) => workspace.id === defaultValue?.id
//     );
//     if (findSelectedWorkspace) setSelectedOption(findSelectedWorkspace);
//   }, [state, defaultValue]);

//   return (
//     <div
//       className=" relative inline-block
//       text-left
//   "
//     >
//       <div>
//         <span onClick={() => setIsOpen(!isOpen)}>
//           {selectedOption ? (
//             <SelectedWorkspace workspace={selectedOption} />
//           ) : (
//             'Select a workspace'
//           )}
//         </span>
//       </div>
//       {isOpen && (
//         <div
//           className="origin-top-right
//           absolute
//           w-full
//           rounded-md
//           shadow-md
//           z-50
//           h-[190px]
//           bg-black/10
//           backdrop-blur-lg
//           group
//           overflow-scroll
//           border-[1px]
//           border-muted
//       "
//         >
//           <div className="rounded-md flex flex-col">
//             <div className="!p-2">
//               {!!privateWorkspaces.length && (
//                 <>
//                   <p className="text-muted-foreground">Private</p>
//                   <hr></hr>
//                   {privateWorkspaces.map((option) => (
//                     <SelectedWorkspace
//                       key={option.id}
//                       workspace={option}
//                       onClick={handleSelect}
//                     />
//                   ))}
//                 </>
//               )}
//               {!!sharedWorkspaces.length && (
//                 <>
//                   <p className="text-muted-foreground">Shared</p>
//                   <hr />
//                   {sharedWorkspaces.map((option) => (
//                     <SelectedWorkspace
//                       key={option.id}
//                       workspace={option}
//                       onClick={handleSelect}
//                     />
//                   ))}
//                 </>
//               )}
//               {!!collaboratingWorkspaces.length && (
//                 <>
//                   <p className="text-muted-foreground">Collaborating</p>
//                   <hr />
//                   {collaboratingWorkspaces.map((option) => (
//                     <SelectedWorkspace
//                       key={option.id}
//                       workspace={option}
//                       onClick={handleSelect}
//                     />
//                   ))}
//                 </>
//               )}
//             </div>
//             <CustomDialogTrigger
//               header="Create A Workspace"
//               content={<WorkspaceCreator />}
//               description="Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too."
//             >
//               <div
//                 className="flex 
//               transition-all 
//               hover:bg-muted 
//               justify-center 
//               items-center 
//               gap-2 
//               p-2 
//               w-full"
//               >
//                 <article
//                   className="text-slate-500 
//                 rounded-full
//                  bg-slate-800 
//                  w-4 
//                  h-4 
//                  flex 
//                  items-center 
//                  justify-center"
//                 >
//                   +
//                 </article>
//                 Create workspace
//               </div>
//             </CustomDialogTrigger>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkspaceDropdown;


  // // Function to sort workspaces by name
  // const sortWorkspacesByName = (workspaces: workspace[]) => {
  //   return workspaces.sort((a, b) => a.name.localeCompare(b.name));
  // };





// 'use client';
// import { useAppState } from '@/lib/providers/state-provider';
// import { workspace } from '@/lib/supabase/supabase.types';
// import React, { useEffect, useState } from 'react';
// import SelectedWorkspace from './selected-workspace';
// import CustomDialogTrigger from '../global/custom-dialog-trigger';
// import WorkspaceCreator from '../global/workspace-creator';
// import { getCollaboratingWorkspaces, getPrivateWorkspaces, getSharedWorkspaces } from '@/lib/supabase/queries';
// // import { getPrivateWorkspaces, getCollaboratingWorkspaces, getSharedWorkspaces } from './query';

// interface WorkspaceDropdownProps {
//   userId: string;
//   privateWorkspaces: workspace[] | [];
//   sharedWorkspaces: workspace[] | [];
//   collaboratingWorkspaces: workspace[] | [];
//   defaultValue: workspace | undefined;
// }

// const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({ userId, defaultValue }) => {
//   const { dispatch, state } = useAppState();
//   const [selectedOption, setSelectedOption] = useState(defaultValue);
//   const [isOpen, setIsOpen] = useState(false);
//   const [workspaces, setWorkspaces] = useState<workspace[]>([]);

//   useEffect(() => {
//     const fetchWorkspaces = async () => {
//       if (!userId) return;

//       const privateWorkspaces = await getPrivateWorkspaces(userId);
//       const collaboratingWorkspaces = await getCollaboratingWorkspaces(userId);
//       const sharedWorkspaces = await getSharedWorkspaces(userId);

//       const allWorkspaces = [...privateWorkspaces, ...collaboratingWorkspaces, ...sharedWorkspaces];
//       const sortedWorkspaces = allWorkspaces.sort((a, b) => a.title.localeCompare(b.title));
//       setWorkspaces(sortedWorkspaces);

//       dispatch({
//         type: 'SET_WORKSPACES',
//         payload: { workspaces: sortedWorkspaces.map(workspace => ({ ...workspace, folders: [] })) },
//       });
//     };

//     fetchWorkspaces();
//   }, [userId, dispatch]);

//   const handleSelect = (option: workspace) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     const findSelectedWorkspace = state.workspaces.find(workspace => workspace.id === defaultValue?.id);
//     if (findSelectedWorkspace) setSelectedOption(findSelectedWorkspace);
//   }, [state, defaultValue]);

//   return (
//     <div className="relative inline-block text-left">
//       <div>
//         <span onClick={() => setIsOpen(!isOpen)}>
//           {selectedOption ? (
//             <SelectedWorkspace workspace={selectedOption} />
//           ) : (
//             'Select a workspace'
//           )}
//         </span>
//       </div>
//       {isOpen && (
//         <div className="origin-top-right absolute w-full rounded-md shadow-md z-50 h-[190px] bg-black/10 backdrop-blur-lg group overflow-scroll border-[1px] border-muted">
//           <div className="rounded-md flex flex-col">
//             <div className="!p-2">
//               {!!workspaces.length && (
//                 <>
//                   <p className="text-muted-foreground">All Workspaces</p>
//                   <hr />
//                   {workspaces.map(option => (
//                     <SelectedWorkspace key={option.id} workspace={option} onClick={handleSelect} />
//                   ))}
//                 </>
//               )}
//             </div>
//             <CustomDialogTrigger
//               header="Create A Workspace"
//               content={<WorkspaceCreator />}
//               description="Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too."
//             >
//               <div className="flex transition-all hover:bg-muted justify-center items-center gap-2 p-2 w-full">
//                 <article className="text-slate-500 rounded-full bg-slate-800 w-4 h-4 flex items-center justify-center">
//                   +
//                 </article>
//                 Create workspace
//               </div>
//             </CustomDialogTrigger>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkspaceDropdown;






















'use client';
import { useAppState } from '@/lib/providers/state-provider';
import { workspace } from '@/lib/supabase/supabase.types';
import React, { useEffect, useState } from 'react';
import SelectedWorkspace from './selected-workspace';
import CustomDialogTrigger from '../global/custom-dialog-trigger';
import WorkspaceCreator from '../global/workspace-creator';
import { getCollaboratingWorkspaces, getPrivateWorkspaces, getSharedWorkspaces } from '@/lib/supabase/queries';

interface WorkspaceDropdownProps {
    privateWorkspaces: workspace[] | [];
  sharedWorkspaces: workspace[] | [];
  collaboratingWorkspaces: workspace[] | [];
  userId: string;
  defaultValue: workspace | undefined;
}

const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({ userId, defaultValue }) => {
  const { dispatch, state } = useAppState();
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [privateWorkspaces, setPrivateWorkspaces] = useState<workspace[]>([]);
  const [collaboratingWorkspaces, setCollaboratingWorkspaces] = useState<workspace[]>([]);
  const [sharedWorkspaces, setSharedWorkspaces] = useState<workspace[]>([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (!userId) return;

      const fetchedPrivateWorkspaces = await getPrivateWorkspaces(userId);
      const fetchedCollaboratingWorkspaces = await getCollaboratingWorkspaces(userId);
      const fetchedSharedWorkspaces = await getSharedWorkspaces(userId);

      setPrivateWorkspaces(fetchedPrivateWorkspaces.sort((a, b) => a.title.localeCompare(b.title)));
      setCollaboratingWorkspaces(fetchedCollaboratingWorkspaces.sort((a, b) => a.title.localeCompare(b.title)));
      setSharedWorkspaces(fetchedSharedWorkspaces.sort((a, b) => a.title.localeCompare(b.title)));

      dispatch({
        type: 'SET_WORKSPACES',
        payload: { 
          workspaces: [
            ...fetchedPrivateWorkspaces,
            ...fetchedCollaboratingWorkspaces,
            ...fetchedSharedWorkspaces,
          ].map(workspace => ({ ...workspace, folders: [] })),
        },
      });
    };

    fetchWorkspaces();
  }, [userId, dispatch]);

  const handleSelect = (option: workspace) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const findSelectedWorkspace = state.workspaces.find(workspace => workspace.id === defaultValue?.id);
    if (findSelectedWorkspace) setSelectedOption(findSelectedWorkspace);
  }, [state, defaultValue]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <span onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? (
            <SelectedWorkspace workspace={selectedOption} />
          ) : (
            'Select a workspace'
          )}
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute w-full rounded-md shadow-md z-50 h-[190px] bg-black/10 backdrop-blur-lg group overflow-scroll border-[1px] border-muted">
          <div className="rounded-md flex flex-col">
            <div className="!p-2">
              {!!privateWorkspaces.length && (
                <>
                  <p className="text-muted-foreground">Private</p>
                  <hr />
                  {privateWorkspaces.map(option => (
                    <SelectedWorkspace key={option.id} workspace={option} onClick={handleSelect} />
                  ))}
                </>
              )}
              {!!sharedWorkspaces.length && (
                <>
                  <p className="text-muted-foreground">Shared</p>
                  <hr />
                  {sharedWorkspaces.map(option => (
                    <SelectedWorkspace key={option.id} workspace={option} onClick={handleSelect} />
                  ))}
                </>
              )}
              {!!collaboratingWorkspaces.length && (
                <>
                  <p className="text-muted-foreground">Collaborating</p>
                  <hr />
                  {collaboratingWorkspaces.map(option => (
                    <SelectedWorkspace key={option.id} workspace={option} onClick={handleSelect} />
                  ))}
                </>
              )}
            </div>
            <CustomDialogTrigger
              header="Create A Workspace"
              content={<WorkspaceCreator />}
              description="Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too."
            >
              <div className="flex transition-all hover:bg-muted justify-center items-center gap-2 p-2 w-full">
                <article className="text-slate-500 rounded-full bg-slate-800 w-4 h-4 flex items-center justify-center">
                  +
                </article>
                Create workspace
              </div>
            </CustomDialogTrigger>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDropdown;


