import { deleteReviewById } from "@/actions/deleteActions"; // Import your deleteReviewById function

export default async function handler(req, res) {
  const reviewId = req.params.id;
  await deleteReviewById(reviewId);
}
