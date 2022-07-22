import { register, login, updateUser } from "../controllers/authController.js";
import express from "express";

const routes = express.Router();

routes.route("/register").post(register);
routes.route("/login").post(login);
routes.route("/updateUser").patch(updateUser);

export default routes;
