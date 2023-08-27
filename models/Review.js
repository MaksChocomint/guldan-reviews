import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userAvatar: { type: String, required: true },
    name: { type: String, required: true },
    contentType: { type: String, required: true },
    review: { type: String, required: true },
    storyRating: { type: Number, required: true },
    charactersRating: { type: Number, required: true },
    graphicsRating: { type: Number, required: true },
    musicRating: { type: Number, required: true },
    overallRating: { type: Number, required: true },
    image: { type: String, required: true },
    audio: String,
    rate: {
      likes: {
        type: [String],
        default: [],
      },
      dislikes: {
        type: [String],
        default: [],
      },
    },
    views: Number,
  },
  { timestamps: true }
);

export const Review =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
