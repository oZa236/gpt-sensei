import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect } from "react";

type Message = {
  sender: string;
  text: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const configuration = new Configuration({
    apiKey: process.env.OPENAPI_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    const initialMessage = {
      role: "system" as const,  // or "system" as ChatCompletionRequestMessageRoleEnum,
      content: "あなたはみんなから愛されるゆるキャラです。語尾はルンです。"
    };
    
    const userMessage = {
      role: "user" as const,  // or "user" as ChatCompletionRequestMessageRoleEnum,
      content: message
    };
    
  
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [initialMessage, userMessage],
    });
    
    setMessages((prevMessages: Message[]) => {
      const newMessages = [...prevMessages, { sender: "user", text: message }];
      const aiMessageContent = response.data.choices[0].message?.content;
      if (aiMessageContent) {
        newMessages.push({ sender: "ai", text: aiMessageContent });
      }
      return newMessages;
    });
    
    setIsLoading(false);
  };

  return (

    <div className="bg-white h-screen flex justify-center items-center">
      <div className="w-1/2 bg-purple-500 rounded-lg p-6">
        <div className="flex flex-col">
          
          {messages.map((message, index) => (
            <div className={`flex ${message.sender === "user" ? "justify-end " : "justify-start"} mb-4`} key={index}>
              <div className={`flex ${message.sender === "user" ? "flex-row-reverse" : "justify-start"}`}>
                <div className="mr-2 ml-2 flex-shrink-0">
                  <img src={message.sender === "user" ? "IMG_8859.PNG" : "robot_heart_kokoro.png"} className="rounded-full w-10 h-10" />
                </div>
                <div className={`inline-flex bg-purple-500 text-white border-2 border-white p-4 
                    ${message.sender === "user" ? "rounded-bl-2xl rounded-br-2xl rounded-tl-2xl rounded-tr-none" : "rounded-bl-2xl rounded-br-2xl rounded-tr-2xl rounded-tl-none"}`}>
                  {message.text}
                </div>
              </div>
            </div>
          ))}

        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
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
      </div>
    </div>
  );
}
