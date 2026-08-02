import mongoose, { Schema, Document, model, models } from "mongoose";
import bcryptjs from "bcryptjs";

export interface IUser extends Document { 
  name: string;
  email: string;
  password: string;
  image?: string;
  phone?: string;
  role: 'user' | 'admin';
  message?: string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    message: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcryptjs.compare(password, this.password);
};

const User = models?.User || model<IUser>("User", userSchema);

export default User;

