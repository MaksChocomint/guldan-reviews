import { useState, useEffect } from "react";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import { getAllReviewComments } from "@/actions/getActions";

const CommentSection = ({ reviewId }) => {
  const [commentList, setCommentList] = useState([]);
  const fetchData = async () => {
    try {
      const comments = await getAllReviewComments(reviewId);
      setCommentList(comments);
    } catch (error) {
      console.error("Ошибка при получении комментариев:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 items-start justify-center w-full mt-5">
      <CommentInput reviewId={reviewId} fetchData={fetchData} />
      <h1 className="font-bold text-xl mb-1 mt-3">Комментарии пользователей</h1>
      {commentList &&
        commentList.map((comment) => {
          return <CommentItem key={comment._id} comment={comment} />;
        })}
    </div>
  );
};

export default CommentSection;
