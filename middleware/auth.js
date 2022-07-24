import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../Errors/index.js";

const auth = (req, _, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new NotAuthorizedError(
      "You do not have access to the requested resource!"
    );
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    throw new NotAuthorizedError(
      "You do not have access to the requested resource!"
    );
  }
};

export default auth;
