export interface IMediaDocument extends Document {
  type: string;
  url: string;
  thumbnail?: string;
}

export interface IChatDocument extends Document {
  senderId: Schema.Types.ObjectId;
  receiverId: Schema.Types.ObjectId;
  message?: string;
  media?: {
    type: string;
    url: string;
    thumbnail?: string;
  };
  timestamp?: Date;
}
