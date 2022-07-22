import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../Errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).send(user);
};

const login = async (req, res) => {
  res.send("login");
};

const updateUser = async (req, res) => {
  res.send("updateUser");
};

export { register, login, updateUser };
