import { Server } from "socket.io";
import { initializeChatSocket } from "../../sockets/chat.socket";

const setupSocket = (io: Server) => {
  initializeChatSocket(io);
};

export { setupSocket };
