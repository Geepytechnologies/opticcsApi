import { Request } from "express";
import jwt from "jsonwebtoken";
// import { IUser } from "../models/user";
export interface customRequest extends Request {
  user?: any;
}
export const expressAuthentication = async (
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> => {
  if (securityName === "jwt") {
    const authHeader = request.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authorization denied");
    }

    const token = authHeader.split(" ")[1];

    return new Promise<any>((resolve, reject) => {
      jwt.verify(token, process.env.ACCESS_SECRET as string, (err, decoded) => {
        if (err) {
          return reject(new Error("Invalid token"));
        }

        const user = decoded as any;

        // Role-based access control with scopes
        if (scopes?.includes("admin") && !user.isAdmin) {
          return reject(new Error("Admin access required"));
        }

        resolve(user);
      });
    });
  }

  throw new Error("Unsupported security name");
};
