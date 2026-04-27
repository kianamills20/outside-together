import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

function getJwtSecret() {
  if (!SECRET) {
    throw new Error("JWT_SECRET is required to sign and verify auth tokens.");
  }
  return SECRET;
}

export function createToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, getJwtSecret());
}
