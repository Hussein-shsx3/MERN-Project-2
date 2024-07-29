import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 50,
  },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isVerified: { type: Boolean, default: false },
});

const User = new mongoose.model("User", UsersSchema);

export default User;
