import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true,trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    community: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user", },
    image: { type: String, required: true },
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;