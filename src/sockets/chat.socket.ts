import { Server, Socket } from "socket.io";
import chatModel from "../models/chat/chat.model";
// import { socketAuthMiddleware } from "../middlewares/auth.middleware";

export const initializeChatSocket = (io: Server) => {
  // Authenticate Socket connections
  // io.use(socketAuthMiddleware);

  io.on("connection", (socket: Socket) => {
    // Retrieve userId from the query parameters
    const userId = socket.handshake.query.userId as string;
    console.log("A user connected with id:", userId);

    // Join room for the connected user based on their userId
    socket.join(userId);

    // Listen for the "sendMessage" event to save and broadcast messages
    socket.on("individual", async (data) => {
      const { senderId, receiverId, message, media } = data;

      console.log("Message received:", {
        senderId,
        receiverId,
        message,
        media,
      });

      // Save chat to MongoDB
      const chat = await new chatModel({
        senderId,
        receiverId,
        message,
        media,
      }).save();

      // Emit the message to both sender and receiver in their respective rooms
      io.to(senderId).emit("individual", chat);
      io.to(receiverId).emit("individual", chat);
    });

    // Listen for the "individual" event to handle messages for individual users
    socket.on("individual", (data) => {
      const { targetUserId, message } = data;

      // Emit the message to the target user by joining their userId room
      io.to(targetUserId).emit("individual", {
        senderId: userId,
        message,
      });
    });

    // Handle disconnection
    socket.on("disconnect", (reason) => {
      console.log(`User with id ${userId} disconnected. Reason: ${reason}`);

      // Optionally, emit a "userDisconnected" event to notify other users
      io.to(userId).emit("userDisconnected", { userId, reason });
    });
  });
};
