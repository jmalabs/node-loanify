import mongoose from "mongoose";
import validator from "validator";
import bcrypjs from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "LastName",
  },
  location: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "My City",
  },
  role: { type: mongoose.Types.ObjectId, ref: "Role" },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.isModified("role")) {
    return;
  }

  const salt = await bcrypjs.genSalt(8);
  this.password = await bcrypjs.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypjs.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
