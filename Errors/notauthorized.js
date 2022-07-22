import { StatusCodes } from "http-status-codes";

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
  }

  statusCode = StatusCodes.UNAUTHORIZED;
}

export default NotAuthorizedError;
