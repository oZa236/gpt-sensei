// pages/index.tsx
import { useEffect, useState } from 'react';
import { Message, createChatCompletion } from '../app/components/ChatAPI';
import  MessageList  from '../app/components/MessageList';
import  MessageForm  from '../app/components/MessageForm';
import Header from '@/app/components/Header';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);


const handleNewMessage = async (message: string) => {
  setIsLoading(true);

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  const responseData = await response.json();
  const aiMessageContent = responseData?.content;

  setMessages((prevMessages: Message[]) => {
    const newMessages = [...prevMessages, { sender: "user", text: message }];
    if (aiMessageContent) {
      newMessages.push({ sender: "ai", text: aiMessageContent });
    }
    return newMessages;
  });

  setIsLoading(false);
};


  return (
    <div className=''>
      <div className='z-10 relative'>
        <Header />
      </div>
      <div className="bg-white h-screen flex justify-center items-center z-0">
        <div className="w-1/2 bg-gradient-to-br from-blue-300 to-purple-600 rounded-lg p-6">
          <MessageList messages={messages} />
          <MessageForm isLoading={isLoading} onMessageSubmit={handleNewMessage} />
        </div>
      </div>
    </div>
  );
}
