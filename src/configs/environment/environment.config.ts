export const environment = {
  server: {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
  },
  database: {
    MONGOOSE_URI: process.env.MONGOOSE_URI || "mongodb://localhost:27017/chat",
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET || "your-default",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  },
};
