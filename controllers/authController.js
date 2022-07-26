import User from "../models/User.js";
import Role from "../models/Role.js";
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
  const user = await User.findOne({ email }).populate("role");
  if (!user) {
    throw new NotAuthorizedError("Login failed!");
  }

  const result = await user.comparePassword(password);
  if (result === true) {
    const token = await user.createJWT();
    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        role: user.role.name,
      },
      token,
    });
  }

  throw new NotAuthorizedError("Login failed!");
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location, role } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values.");
  }

  const user = await User.findOne({ _id: req.user.userId }).populate("role");
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  const token = await user.createJWT();

  res.json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      role: user.role.name,
    },
  });
};

const getProfile = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    throw BadRequestError("Please provide User ID");
  }

  const user = await User.findOne({ _id: req.user.userId }).populate("role");
  res.json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      role: user.role.name,
    },
  });
};

const addRole = async (req, res) => {
  const { name, description } = req.body;
  const roleAlreadyExists = await Role.findOne({ name });

  if (roleAlreadyExists) {
    throw new BadRequestError("Role already exists!");
  }

  try {
    const role = await Role.create({ name, description });
    await role.save();
    res.status(StatusCodes.CREATED).send(role);
  } catch (error) {
    console.log(error);
  }
};

export { register, login, updateUser, addRole, getProfile };
