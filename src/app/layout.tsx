// export const dynamic = 'force-dynamic';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import db from '@/lib/supabase/db';
// import 'punycode/';
// import { ThemeProvider } from '@/lib/providers/next-theme-provider';
// import { DM_Sans } from 'next/font/google';
// import { twMerge } from 'tailwind-merge';

// import { Toaster } from '@/components/ui/toaster';
// import AppStateProvider from '@/lib/providers/state-provider';
// import { SupabaseUserProvider } from '@/lib/providers/supabase-user-provider';
// import { SocketProvider } from '@/lib/providers/socket-provider';

// const inter = DM_Sans({ subsets: ['latin']});


// export const metadata: Metadata = {
//   title: 'IdeaCanvas',
//   description: 'Developed By Piyush R.',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   console.log(db);
//   return (
//     <html lang="en">
//       <body className={twMerge('bg-background', inter.className)}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="dark"
//           enableSystem
//         >
//           <AppStateProvider>
//             <SupabaseUserProvider>
//               <SocketProvider>
//                 {children}
//                 <Toaster />
//               </SocketProvider>
            
//             </SupabaseUserProvider>
//           </AppStateProvider>
          

//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }




// export const dynamic = 'force-dynamic';

// import type { Metadata } from 'next';
// import db from '@/lib/supabase/db';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import { ThemeProvider } from '@/lib/providers/next-theme-provider';
// import { DM_Sans } from 'next/font/google';
// import { twMerge } from 'tailwind-merge';
// import AppStateProvider from '@/lib/providers/state-provider';
// import { SupabaseUserProvider } from '@/lib/providers/supabase-user-provider';
// import { Toaster } from '@/components/ui/toaster';
// import { SocketProvider } from '@/lib/providers/socket-provider';
// import 'punycode/';

// const inter = DM_Sans({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'IdeaCanvas.',
//   description: 'Developed By Piyush R.',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   console.log(db);
//   return (
//     <html lang="en">
//       <body className={twMerge('bg-background', inter.className)}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="dark"
//           enableSystem
//         >
//           <AppStateProvider>
//             <SupabaseUserProvider>
//               <SocketProvider>
//                 {children}
//                 <Toaster />
//               </SocketProvider>
//             </SupabaseUserProvider>
//           </AppStateProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }





export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/providers/next-theme-provider';
import { DM_Sans } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import AppStateProvider from '@/lib/providers/state-provider';
import { SupabaseUserProvider } from '@/lib/providers/supabase-user-provider';
import { Toaster } from '@/components/ui/toaster';
import { SocketProvider } from '@/lib/providers/socket-provider';

const inter = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IdeaCanvas',
  description: 'Developed By Piyush R.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={twMerge('bg-background', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <AppStateProvider>
            <SupabaseUserProvider>
              <SocketProvider>
                {children}
                <Toaster />
              </SocketProvider>
            </SupabaseUserProvider>
          </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}