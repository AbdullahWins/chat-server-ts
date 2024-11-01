import { Request, Response } from "express";
import { Chat } from "../../models";

interface ChatHistoryRequest extends Request {
  params: {
    userId: string;
    chatWithUserId: string;
  };
}

export const getChatHistory = async (
  req: ChatHistoryRequest,
  res: Response
): Promise<void> => {
  const { userId, chatWithUserId } = req.params;
  const chatHistory = await Chat.find({
    $or: [
      { senderId: userId, receiverId: chatWithUserId },
      { senderId: chatWithUserId, receiverId: userId },
    ],
  }).sort({ timestamp: 1 });
  res.json(chatHistory);
};
