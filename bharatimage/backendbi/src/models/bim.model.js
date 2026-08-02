import mongoose from "mongoose";

const bimSchema = new mongoose.Schema(
  {
    media: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String },
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
    tags: { type: [String] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },      
  },
  { timestamps: true }
);



const Bim = mongoose.models.Bim || mongoose.model("Bim", bimSchema);
export default Bim;






