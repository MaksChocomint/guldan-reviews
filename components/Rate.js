"use client";
import { setLikesCount, setDislikesCount } from "@/actions/setActions";
import { useSession } from "next-auth/react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useState, useEffect } from "react";

const Rate = ({ review, id, setReviewList }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { data: session } = useSession();

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      await setLikesCount(review._id, session);
      if (id !== undefined) {
        if (liked) {
          setReviewList((prevReviewList) => {
            return prevReviewList.map((review, idx) => {
              if (idx === id) {
                return {
                  ...review,
                  likes: review.likes.filter(
                    (email) => email !== session.user?.email
                  ),
                };
              }
              return review;
            });
          });
          setLiked((prevLiked) => !prevLiked);
        } else {
          setReviewList((prevReviewList) => {
            return prevReviewList.map((review, idx) => {
              if (idx === id) {
                return {
                  ...review,
                  likes: [...review.likes, session.user?.email],
                  dislikes: review.dislikes.filter(
                    (email) => email !== session.user?.email
                  ),
                };
              }
              return review;
            });
          });
          setLiked((prevLiked) => !prevLiked);
          setDisliked((prevDisliked) => !prevDisliked);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislikeClick = async (e) => {
    e.stopPropagation();
    try {
      await setDislikesCount(review._id, session);
      if (id !== undefined) {
        if (disliked) {
          setReviewList((prevReviewList) => {
            return prevReviewList.map((review, idx) => {
              if (idx === id) {
                return {
                  ...review,
                  dislikes: review.dislikes.filter(
                    (email) => email !== session.user?.email
                  ),
                };
              }
              return review;
            });
          });
          setDisliked((prevDisliked) => !prevDisliked);
        } else {
          setReviewList((prevReviewList) => {
            return prevReviewList.map((review, idx) => {
              if (idx === id) {
                return {
                  ...review,
                  dislikes: [...review.dislikes, session.user?.email],
                  likes: review.likes.filter(
                    (email) => email !== session.user?.email
                  ),
                };
              }
              return review;
            });
          });
          setDisliked((prevDisliked) => !prevDisliked);
          setLiked((prevLiked) => !prevLiked);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (session) {
      setLiked(review.likes.includes(session.user?.email));
      setDisliked(review.dislikes.includes(session.user?.email));
    }
  }, [session, review]);

  useEffect(() => {});
  return (
    <div className="flex gap-2 absolute z-50 right-2 top-2 items-center">
      <div className="text-base font-semibold text-green-400 drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.8)]">
        {review.likes.length}
      </div>
      <AiFillLike
        size={20}
        className={`${
          liked ? "text-green-500" : "text-zinc-300"
        } drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer transition-colors hover:text-green-300`}
        onClick={handleLikeClick}
      />
      <div className="text-base font-semibold text-red-400 drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.8)]">
        {review.dislikes.length}
      </div>
      <AiFillDislike
        size={20}
        className={`${
          disliked ? "text-red-500" : "text-zinc-300"
        } drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer transition-colors hover:text-red-300`}
        onClick={handleDislikeClick}
      />
    </div>
  );
};

export default Rate;
