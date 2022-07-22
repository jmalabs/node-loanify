import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotAuthorizedError } from "../Errors/index.js";

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
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError("Login failed!");
  }

  const result = await user.comparePassword(password);
  if (result === true) {
    const token = await user.createJWT();
    return res.status(200).json({
      user: { name: user.name, email: user.email, lastName: user.lastName },
      token,
    });
  }

  throw new NotAuthorizedError("Login failed!");
};

const updateUser = async (req, res) => {
  res.send("updateUser");
};

export { register, login, updateUser };
