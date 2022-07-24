import { register, login, updateUser } from "../controllers/authController.js";
import express from "express";
import authenticateMiddleware from "../middleware/auth.js";
const routes = express.Router();

routes.route("/register").post(register);
routes.route("/login").post(login);
routes.route("/updateUser").patch(authenticateMiddleware, updateUser);

export default routes;
