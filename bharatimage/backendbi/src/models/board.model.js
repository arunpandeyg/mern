import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },      
  },
  { timestamps: true }
);



const Board = mongoose.models.Board || mongoose.model("Board", boardSchema);
export default Board;


