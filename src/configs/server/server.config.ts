import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { environment } from "../environment/environment.config";

const app = express();
const server = createServer(app);
const io = new Server(server);

const startServer = () => {
  server.listen(environment.server.SERVER_PORT, () => {
    console.log(`Server running on port ${environment.server.SERVER_PORT}`);
  });
};

export { app, io, startServer };
