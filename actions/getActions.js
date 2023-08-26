"use server";
import { Review } from "@/models/Review";

export async function getAllReviews() {
  try {
    const selectAllReviews = await Review.find().sort("-createdAt");
    const reviews = [];
    selectAllReviews.forEach((review) => {
      const reviewObj = {
        _id: review._id.toString(),
        userName: review.userName,
        userEmail: review.userEmail,
        userAvatar: review.userAvatar,
        name: review.name,
        contentType: review.contentType,
        review: review.review,
        storyRating: review.storyRating,
        charactersRating: review.charactersRating,
        graphicsRating: review.graphicsRating,
        musicRating: review.musicRating,
        overallRating: review.overallRating,
        image: review.image,
        audio: review.audio,
        rate: review.rate,
      };

      reviews.push(reviewObj);
    });
    return reviews;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getUserReviews(session) {
  try {
    if (!session) {
      return [];
    }
    const userEmail = session.user.email;
    const selectUserReviews = await Review.find({ userEmail }).sort(
      "-createdAt"
    );

    const reviews = [];

    selectUserReviews.forEach((review) => {
      const reviewObj = {
        _id: review._id.toString(),
        userName: review.userName,
        userEmail: review.userEmail,
        userAvatar: review.userAvatar,
        name: review.name,
        contentType: review.contentType,
        review: review.review,
        storyRating: review.storyRating,
        charactersRating: review.charactersRating,
        graphicsRating: review.graphicsRating,
        musicRating: review.musicRating,
        overallRating: review.overallRating,
        image: review.image,
        audio: review.audio,
        rate: review.rate,
      };

      reviews.push(reviewObj);
    });

    return reviews;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getReviewById(reviewId) {
  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return null;
    }

    const reviewObj = {
      _id: review._id.toString(),
      userName: review.userName,
      userEmail: review.userEmail,
      userAvatar: review.userAvatar,
      name: review.name,
      contentType: review.contentType,
      review: review.review,
      storyRating: review.storyRating,
      charactersRating: review.charactersRating,
      graphicsRating: review.graphicsRating,
      musicRating: review.musicRating,
      overallRating: review.overallRating,
      image: review.image,
      audio: review.audio,
      rate: review.rate,
    };

    return reviewObj;
  } catch (error) {
    console.error(error);
  }
}
