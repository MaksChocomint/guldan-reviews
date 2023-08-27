"use server";
import { Review } from "@/models/Review";
import { getReviewById } from "./getActions";

export async function setLikesCount(reviewId, session) {
  try {
    const review = await getReviewById(reviewId);
    const reviewLikes = review.likes;
    const reviewDislikes = review.dislikes;

    if (reviewDislikes.includes(session.user?.email)) {
      await Review.findByIdAndUpdate(reviewId, {
        $pull: { "rate.dislikes": session.user?.email },
        $push: { "rate.likes": session.user?.email },
      });
    } else {
      if (reviewLikes.includes(session.user?.email)) {
        await Review.findByIdAndUpdate(reviewId, {
          $pull: { "rate.likes": session.user?.email },
        });
      } else {
        await Review.findByIdAndUpdate(reviewId, {
          $push: { "rate.likes": session.user?.email },
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export async function setDislikesCount(reviewId, session) {
  try {
    const review = await getReviewById(reviewId);
    const reviewLikes = review.likes;
    const reviewDislikes = review.dislikes;

    if (reviewLikes.includes(session.user?.email)) {
      await Review.findByIdAndUpdate(reviewId, {
        $pull: { "rate.likes": session.user?.email },
        $push: { "rate.dislikes": session.user?.email },
      });
    } else {
      if (reviewDislikes.includes(session.user?.email)) {
        await Review.findByIdAndUpdate(reviewId, {
          $pull: { "rate.dislikes": session.user?.email },
        });
      } else {
        await Review.findByIdAndUpdate(reviewId, {
          $push: { "rate.dislikes": session.user?.email },
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export async function setViews(reviewId) {
  try {
    await Review.findByIdAndUpdate(reviewId, { $inc: { views: 1 } });
  } catch (err) {
    console.error(err);
  }
}
