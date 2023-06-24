// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createChatCompletion } from '../../app/components/ChatAPI';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;
  
  const response = await createChatCompletion(message);
  
  res.status(200).json(response.data.choices[0].message);
}
