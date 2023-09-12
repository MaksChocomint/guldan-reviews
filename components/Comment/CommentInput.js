import { uploadComment } from "@/actions/uploadActions";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSelector } from "react-redux";

const CommentInput = ({ reviewId, fetchData }) => {
  const style = useSelector((state) => state.styles);
  const [comment, setComment] = useState("");
  const { data: session } = useSession();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const commentData = [];
    if (session && comment) {
      commentData.push(
        session.user?.name,
        session.user?.email,
        session.user?.image,
        comment,
        reviewId
      );

      await uploadComment(commentData);
      setComment("");
      fetchData();
    }
  };

  return (
    <div className="flex justify-center w-full flex-col">
      <h1 className="font-bold text-xl mb-1">Ваш комментарий</h1>
      <textarea
        type="text"
        value={comment}
        onChange={handleChange}
        className={`w-full resize-none px-2 py-1 h-32 rounded-t-md ${style.input}`}
        placeholder="Текст комментария"
      />
      <button
        className={`rounded-b-md px-2 py-1 ${
          style.foreground.slice(0, -3) +
          (Number(style.foreground.slice(-3)) + 100)
        } w-auto transition-colors ${style.btnHover}`}
        onClick={handleClick}
      >
        Написать
      </button>
    </div>
  );
};

export default CommentInput;
