'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io as ClientIO } from 'socket.io-client';

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: '/api/socket/io',
        addTrailingSlash: false,
      }
    );
    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
        if (socketInstance) {
            socketInstance.disconnect()
          }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};




// 'use client';

// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { io as ClientIO, Socket } from 'socket.io-client';

// type SocketContextType = {
//   socket: Socket | null;
//   isConnected: boolean;
// };

// const SocketContext = createContext<SocketContextType>({
//   socket: null,
//   isConnected: false,
// });

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// // export const useSocket = () => {
// //   const context = useContext(SocketContext);
// //   if (!context) {
// //     throw new Error('useSocket must be used within a SocketProvider');
// //   }
// //   return context;
// // };


// export const SocketProvider = ({ children }: { children: ReactNode }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     const socketInstance: Socket = ClientIO(process.env.NEXT_PUBLIC_SITE_URL!, {
//       path: '/api/socket/io',
//     });

//     socketInstance.on('connect', () => {
//       setIsConnected(true);
//     });

//     socketInstance.on('disconnect', () => {
//       setIsConnected(false);
//     });

//     setSocket(socketInstance);

//     return () => {
//       if (socketInstance) {
//         socketInstance.disconnect();
//       }
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket, isConnected }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };


