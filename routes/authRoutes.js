import {
  register,
  login,
  updateUser,
  addRole,
  getProfile,
} from "../controllers/authController.js";

import express from "express";
import authenticateMiddleware from "../middleware/auth.js";
import grantAccess from "../middleware/grantAccess.js";
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message:
    "Too many request from this IP address, please try again after 15 minutes.",
});

const routes = express.Router();
routes.route("/register").post(apiLimiter, register);
routes.route("/login").post(apiLimiter, login);
routes.route("/roles").post(authenticateMiddleware, addRole);

routes
  .route("/profile")
  .patch(
    authenticateMiddleware,
    grantAccess("updateOwn", "profile"),
    updateUser
  );

routes
  .route("/profile")
  .get(authenticateMiddleware, grantAccess("readOwn", "profile"), getProfile);

export default routes;
