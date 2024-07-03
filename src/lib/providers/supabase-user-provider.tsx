
'use client';

import { AuthUser } from '@supabase/supabase-js';
import { Subscription } from '../supabase/supabase.types';
import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getUserSubscriptionStatus } from '../supabase/queries';
import { useToast } from '@/components/ui/use-toast';

type SupabaseUserContextType = {
  user: AuthUser | null;
  subscription: Subscription | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
  subscription: null,
});

export const useSupabaseUser = () => {
  return useContext(SupabaseUserContext);
};

interface SupabaseUserProviderProps {
  children: React.ReactNode;
}

export const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { toast } = useToast();

  const supabase = createClientComponentClient();

  //Fetch the user details
  //subscrip
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        console.log(user);
        setUser(user);
        const { data, error } = await getUserSubscriptionStatus(user.id);
        if (data) setSubscription(data);
        if (error) {
          toast({
            title: 'Unexpected Error',
            description:
              'Oppse! An unexpected error happened. Try again later.',
          });
        }
      }
    };
    getUser();
  }, [supabase, toast]);
  return (
    <SupabaseUserContext.Provider value={{ user, subscription }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};




// 'use client';

// import { AuthUser } from '@supabase/supabase-js';
// import { Subscription } from '../supabase/supabase.types';
// import { createContext, useContext, useEffect, useState } from 'react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { useToast } from '@/components/ui/use-toast';

// type SupabaseUserContextType = {
//   user: AuthUser | null;
//   subscription: Subscription | null;
// };

// const SupabaseUserContext = createContext<SupabaseUserContextType>({
//   user: null,
//   subscription: null,
// });

// export const useSupabaseUser = () => {
//   return useContext(SupabaseUserContext);
// };

// interface SupabaseUserProviderProps {
//   children: React.ReactNode;
// }

// // Mock subscription data
// const mockSubscription: Subscription = {
//   id: 'mock_subscription_id',
//   userId: 'mock_user_id',
//   status: 'active',
//   // Add any other fields your Subscription type has
// };

// export const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<AuthUser | null>(null);
//   const [subscription, setSubscription] = useState<Subscription | null>(mockSubscription);
//   const { toast } = useToast();

//   const supabase = createClientComponentClient();

//   useEffect(() => {
//     const getUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (user) {
//         console.log(user);
//         setUser(user);
//         // Comment out the actual subscription fetch
//         /*
//         const { data, error } = await getUserSubscriptionStatus(user.id);
//         if (data) setSubscription(data);
//         if (error) {
//           toast({
//             title: 'Unexpected Error',
//             description:
//               'Oops! An unexpected error happened. Try again later.',
//           });
//         }
//         */
//         // Set the mock subscription
//         setSubscription(mockSubscription);
//       }
//     };
//     getUser();
//   }, [supabase, toast]);

//   return (
//     <SupabaseUserContext.Provider value={{ user, subscription }}>
//       {children}
//     </SupabaseUserContext.Provider>
//   );
// };
