import React from "react";
import Image from "next/image";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const timeDiff = now - date;

  const formatTime = (time) => {
    if (time < 60000) {
      return "менее минуты назад";
    } else if (time < 3600000) {
      const minutes = Math.floor(time / 60000);
      return `${minutes} ${minutes === 1 ? "минуту" : "минуты"} назад`;
    } else if (time < 86400000) {
      const hours = Math.floor(time / 3600000);
      return `${hours} ${hours === 1 ? "час" : "часа"} назад`;
    } else {
      const days = Math.floor(time / 86400000);
      return `${days} ${days === 1 ? "день" : "дня"} назад`;
    }
  };

  return formatTime(timeDiff);
};

const CommentItem = ({ comment }) => {
  const formattedDate = formatDate(comment.createdAt);

  return (
    <div className="flex w-full gap-2 items-start justify-start">
      <Image src={comment.userAvatar} alt="avatar" width={48} height={48} />
      <div className="flex flex-col justify-start">
        <div className="flex gap-2 items-center">
          <div className="font-semibold cursor-pointer transition-colors hover:text-zinc-500">
            {comment.userName}
          </div>
          <div className="text-sm font-light opacity-60">{formattedDate}</div>
        </div>
        <div>{comment.message}</div>
      </div>
    </div>
  );
};

export default CommentItem;
