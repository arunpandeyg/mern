import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, default: "user", enum: ["user", "admin"], default: "user" },
    refreshToken: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    gender: { type: String, enum: ["male", "female"], default: "male" }, 
    image: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
