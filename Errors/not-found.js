import { StatusCodes } from "http-status-codes";

class NotFoundError extends Error {
  constructor(message) {
    super(message);
  }

  statusCode = StatusCodes.NOT_FOUND;
}

export default NotFoundError;
