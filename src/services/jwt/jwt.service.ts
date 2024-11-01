import jwt from "jsonwebtoken";
import { environment } from "../../configs";

const secret: string = environment.jwt.JWT_SECRET || "your-default-secret"; // Default secret for development

// Function to generate a JWT token
export const generateToken = (
  payload: object,
  expiresIn: string | number = environment.jwt.JWT_EXPIRES_IN || "1d"
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

// Function to verify a JWT token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
