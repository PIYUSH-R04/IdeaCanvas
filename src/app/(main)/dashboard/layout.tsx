
// import { SubscriptionModalProvider } from '@/lib/providers/SubscriptionModalProvider';
// import { getActiveProductsWithPrice } from '@/lib/supabase/queries';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
  // if (error) throw new Error();
  return <main className="flex over-hidden h-screen">
      {children}
    </main>
  
};

export default Layout;


