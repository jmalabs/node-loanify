import {
  register,
  login,
  updateUser,
  addRole,
} from "../controllers/authController.js";
import express from "express";
import authenticateMiddleware from "../middleware/auth.js";
const routes = express.Router();

routes.route("/register").post(register);
routes.route("/login").post(login);
routes.route("/updateUser").patch(authenticateMiddleware, updateUser);
routes.route("/roles").post(authenticateMiddleware, addRole);

export default routes;
