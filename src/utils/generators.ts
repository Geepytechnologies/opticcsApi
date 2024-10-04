import crypto from "crypto";

export class Generators {
  static generateRandomNumberString(length: number): string {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join(
      ""
    );
  }
  static generateRandomString(length: number): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  }
}
