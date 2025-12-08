import mongoose, { model } from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },   // 🔥 Add this!
    title: { type: String, required: true },
    image: { type: String, default: "" },
    tags: [{ type: String }],
    event_id: { type: Number, default: null }
  },
  { timestamps: true }
);
const Post= mongoose.model("Post", PostSchema)
export default Post
