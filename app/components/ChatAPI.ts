// components/ChatAPI.ts
import { Configuration, OpenAIApi } from "openai";

export type Message = {
  sender: string;
  text: string;
};

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAPI_KEY,
});

const openai = new OpenAIApi(configuration);

export const createChatCompletion = async (message: string) => {
  const initialMessage = {
    role: "system" as const,
    content: "あなたは皆んなから愛されるゆるキャラです。語尾はルンです。"
  };
  
  const userMessage = {
    role: "user" as const,
    content: message
  };

  return await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: [initialMessage, userMessage],
  });
}
