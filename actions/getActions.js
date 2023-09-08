"use server";
import { Review } from "@/models/Review";
import { Comment } from "@/models/Comment";
import { User } from "@/models/User";

export async function getAllReviews(sort) {
  try {
    const selectAllReviews = await Review.find().sort(sort);
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
        likes: review.rate.likes,
        dislikes: review.rate.dislikes,
        views: review.rate.views,
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
        likes: review.rate.likes,
        dislikes: review.rate.dislikes,
        views: review.rate.views,
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
      likes: review.rate.likes,
      dislikes: review.rate.dislikes,
      views: review.rate.views,
    };

    return reviewObj;
  } catch (error) {
    console.error(error);
  }
}

export async function getLikedReviews(session) {
  try {
    if (!session) {
      return [];
    }
    const userEmail = session.user.email;
    const selectLikedReviews = await Review.find({
      "rate.likes": userEmail,
    }).sort("-createdAt");

    const reviews = [];

    selectLikedReviews.forEach((review) => {
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
        likes: review.rate.likes,
        dislikes: review.rate.dislikes,
        views: review.rate.views,
      };
      reviews.push(reviewObj);
    });

    return reviews;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAllReviewComments(reviewId) {
  try {
    const selectAllReviewComments = await Comment.find({
      reviewId: reviewId,
    }).sort("-createdAt");
    const comments = [];
    selectAllReviewComments.forEach((comment) => {
      const commentObj = {
        _id: comment._id.toString(),
        userName: comment.userName,
        userEmail: comment.userEmail,
        userAvatar: comment.userAvatar,
        message: comment.message,
        reviewId: comment.reviewId,
        createdAt: comment.createdAt,
      };

      comments.push(commentObj);
    });
    return comments;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getUserDataByEmail(email) {
  try {
    const userData = await User.findOne({ email: email });
    return userData;
  } catch (error) {
    console.log(error);
    return;
  }
}
