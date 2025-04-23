import React, { useState, useEffect } from 'react';
import { useSocket } from '@/lib/providers/socket-provider';

const Chat = () => {
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', (message: string) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off('receive-message');
      }
    };
  }, [socket]);

  const sendMessage = () => {
    if (input.trim() !== '') {
      socket.emit('send-message', input);
      setMessages((prevMessages) => [...prevMessages, input]);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
