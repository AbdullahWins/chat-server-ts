import { Schema, model } from "mongoose";
import { IChatDocument, IMediaDocument } from "../../interfaces";

const mediaSchema = new Schema<IMediaDocument>({
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
});

const chatSchema = new Schema<IChatDocument>({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
  },
  media: mediaSchema,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Chat = model("Chat", chatSchema);
