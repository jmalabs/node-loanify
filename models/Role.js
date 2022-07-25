import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  // _id: {
  //   type: mongoose.Types.ObjectId,
  // },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model("Role", RoleSchema);
