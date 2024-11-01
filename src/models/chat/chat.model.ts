import { Schema, model } from "mongoose";

const mediaSchema = new Schema({
  type: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String },
});

const chatSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String },
  media: mediaSchema,
  timestamp: { type: Date, default: Date.now },
});

export default model("Chat", chatSchema);
