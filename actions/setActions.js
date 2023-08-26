"use server";
import { Review } from "@/models/Review";

export async function setLikesCount(reviewId, session) {
  try {
    await Review.findByIdAndUpdate(
      { reviewId },
      { $push: { "rate.likes": session.user?.email } }
    );
  } catch (err) {
    console.error(err);
  }
}
