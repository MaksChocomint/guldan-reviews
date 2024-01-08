import { Review } from "@/models/Review";

export async function deleteReviewById(reviewId) {
  try {
    await Review.findByIdAndDelete(reviewId);
  } catch (error) {
    throw new Error("Ошибка при удалении рецензии");
  }
}
