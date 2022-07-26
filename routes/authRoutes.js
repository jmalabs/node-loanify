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
const routes = express.Router();

routes.route("/register").post(register);
routes.route("/login").post(login);

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
