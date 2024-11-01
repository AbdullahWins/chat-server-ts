import chatModel from "../../models/chat/chat.model";
import { Request, Response } from "express";

interface ChatHistoryRequest extends Request {
    params: {
        userId: string;
        chatWithUserId: string;
    };
}

export const getChatHistory = async (req: ChatHistoryRequest, res: Response): Promise<void> => {
    const { userId, chatWithUserId } = req.params;
    const chatHistory = await chatModel
        .find({
            $or: [
                { senderId: userId, receiverId: chatWithUserId },
                { senderId: chatWithUserId, receiverId: userId },
            ],
        })
        .sort({ timestamp: 1 });
    res.json(chatHistory);
};
