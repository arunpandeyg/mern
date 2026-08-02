import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    image: { type: String, required: true },
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User


// import mongoose from 'mongoose';

// const User = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     phone: {
//         type: String,
//         required: true,
//     },
//     role: {
//         type: String,
//         default: 'user',
//     },
//     image: {
//         type: String,
//         default: '',
//     },
// }, { timestamps: true });

// export default mongoose.model('User', User);