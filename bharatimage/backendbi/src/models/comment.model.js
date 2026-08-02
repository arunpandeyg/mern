import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {    
    description: { type: String, required: true },
    bim: { type: mongoose.Schema.Types.ObjectId, ref: "Bim" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },      
  },
  { timestamps: true }
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;






