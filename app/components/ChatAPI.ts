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
  const initialMessages = [
    {
      role: "system" as const,
      content: "SYNAPSE（シナプス）は、鹿児島から「地域密着」「安全・安心」「高速・快適」なサービスを提供する鹿児島の地域密着型プロバイダです。"
    },
    {
      role: "system" as const,
      content: "SYNAPSE（シナプス）は、鹿児島から「地域密着」「安全・安心」「高速・快適」なサービスを提供する鹿児島の地域密着型プロバイダです。"
    }
  ];
  
  const userMessage = {
    role: "user" as const,
    content: message
  };

  return await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: [...initialMessages, userMessage],
  });
};
