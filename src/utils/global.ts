import crypto from "crypto";

export class Global {
  static generateRandomString(length: number) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  }
}
