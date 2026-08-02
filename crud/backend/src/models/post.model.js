import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {    
    image: { type: String},
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    views: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isFeatured: { type: Boolean, default: false },
    visit: { type: Number, default: 0 },   
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
)

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)
export default Post;