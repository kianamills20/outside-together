import { getUserById } from "../db/queries/users.js";
import { verifyToken } from "../utils/jwt.js";

export default async function getUserFromToken(req, _res, next) {
  // WHY (Functionality): Centralizing bearer-token parsing in middleware keeps
  // auth behavior consistent across all routes that need user identity.
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) {
      req.user = null;
      return next();
    }

    const payload = verifyToken(token);
    if (!payload?.id) {
      req.user = null;
      return next();
    }

    req.user = await getUserById(payload.id);
    next();
  } catch (_error) {
    // WHY (Functionality): Invalid/expired tokens should not crash public routes;
    // we treat them as unauthenticated and let protected middleware enforce access.
    req.user = null;
    next();
  }
}
