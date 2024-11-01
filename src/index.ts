import "dotenv/config"; // shorthand for dotenv.config()
import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeChatSocket } from "./sockets/chat.socket";

const app = express();
const server = createServer(app);
const io = new Server(server);

// Middleware and routes setup
initializeChatSocket(io);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.error("MongoDB connection error:", error));
