import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userAvatar: { type: String, required: true },
    message: { type: String, required: true },
    reviewId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
