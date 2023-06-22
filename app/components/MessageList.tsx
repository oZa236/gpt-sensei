// components/MessageList.tsx
import { Message } from './ChatAPI';

type MessageListProps = {
  messages: Message[];
};

const MessageList = ({ messages }: MessageListProps) => (
  <div className="flex flex-col overflow-auto h-full">
    {messages.map((message, index) => (
      <div className={`flex ${message.sender === "user" ? "justify-end " : "justify-start"} mb-4`} key={index}>
        <div className={`flex ${message.sender === "user" ? "flex-row-reverse" : "justify-start"}`}>
          <div className="mr-2 ml-2 flex-shrink-0">
            <img src={message.sender === "user" ? "IMG_8859.PNG" : "robot_heart_kokoro.png"} className="rounded-full w-10 h-10" />
          </div>
          <div className={`inline-flex bg-opacity-50 text-white border-2 border-white p-4 
              ${message.sender === "user" ? "rounded-bl-2xl rounded-br-2xl rounded-tl-2xl rounded-tr-none" : "rounded-bl-2xl rounded-br-2xl rounded-tr-2xl rounded-tl-none"}`}>
            {message.text}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default MessageList;