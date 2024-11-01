// middlewares/socketAuthMiddleware.ts
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

export const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    // Retrieve the token from the socket's handshake headers
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error: Token is required"));
    }

    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    // Attach the user info to the socket for use in event handlers
    socket.data.user = payload;
    next();
  } catch (error) {
    next(new Error("Authentication error: Invalid token"));
  }
};
