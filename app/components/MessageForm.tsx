// components/MessageForm.tsx
import { FormEvent, useState } from 'react';

type MessageFormProps = {
  isLoading: boolean;
  onMessageSubmit: (message: string) => void;
};

const MessageForm = ({ isLoading, onMessageSubmit }: MessageFormProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onMessageSubmit(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center mt-4 pt-4 border-t-2">
        <input
          type="text"
          className="border border-white rounded-lg p-2"
          style={{width: "500px"}}
          placeholder="メッセージを入力してください..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="bg-blue-500 text-white rounded-lg p-2 ml-2" type="submit">
          {isLoading ? "送信中" : "送信"}
        </button>
      </div>
    </form>
  );
};

export default MessageForm;