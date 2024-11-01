import "dotenv/config"; // shorthand for dotenv.config()
import { connectDatabase, io, setupSocket, startServer } from "./configs";

const init = async () => {
  await connectDatabase(); // Connect to the database
  setupSocket(io); // Initialize socket events
  startServer(); // Start the server
};

// Start the application
init().catch((error) => {
  console.error("Error during initialization:", error);
  // Exit the process in case of error
  process.exit(1);
});
