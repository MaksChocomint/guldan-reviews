// ReviewCard.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AudioPlayer from "./AudioPlayer";
import Rating from "./Rating";
import Rate from "./Rate";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import icons for delete and edit
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const ReviewCard = ({ review, id, setReviewList }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const contextMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setContextMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenuVisible(true);
    setContextMenuPosition({
      top: event.clientY + window.scrollY,
      left: event.clientX + window.scrollX,
    });
  };

  const handleDeleteReview = (event) => {
    event.stopPropagation();
    setDeleteModalVisible(true);
  };

  const handleEditReview = (event) => {
    event.stopPropagation();

    session
      ? router.push(`/reviews/${review._id}/edit`)
      : alert(
          "Пожалуйста, войдите, чтобы просматривать рецензии пользователей и добавлять свои!"
        );
  };

  const handleConfirmDelete = async (event) => {
    event.stopPropagation();

    try {
      const response = await fetch(
        `/api/deleteReview/${encodeURIComponent(review._id)}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setReviewList((prevList) =>
          prevList.filter((item) => item._id !== review._id)
        );
        setDeleteModalVisible(false);
      } else {
        console.error("Ошибка при удалении рецензии");
      }
    } catch (error) {
      console.error("Ошибка при удалении рецензии", error);
    }
  };

  const handleCancelDelete = (event) => {
    event.stopPropagation();
    setDeleteModalVisible(false);
  };

  return (
    <div
      className="flex flex-col items-center leading-tight w-full h-64 bg-zinc-600 border-4 border-zinc-700 overflow-hidden rounded-b-xl cursor-pointer transition-colors hover:border-zinc-400"
      onClick={() => {
        session
          ? router.push(`/reviews/${review._id}`)
          : alert(
              "Пожалуйста, войдите, чтобы просматривать рецензии пользователей и добавлять свои!"
            );
      }}
      onContextMenu={handleContextMenu}
    >
      <div className="relative h-5/6 w-full">
        <Rate review={review} id={id} setReviewList={setReviewList} />
        <Image
          src={review.image}
          fill={true}
          quality={100}
          alt="review"
          className="object-cover object-top-center"
          sizes="33vw"
        />
        {review.audio && (
          <AudioPlayer audioUrl={review.audio} reviewId={review._id} />
        )}
      </div>
      <div className="text-white w-full h-1/6 px-2 flex justify-between items-center">
        <div className="flex flex-col justify-center text-base font-medium tracking-wider text-white">
          <span
            style={{
              lineHeight: "1.2",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "170px",
            }}
          >
            {review.name}
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <Image
            src={review.userAvatar}
            width={35}
            height={35}
            quality={100}
            alt="avatar"
            className="border-2 rounded-sm border-zinc-500"
          />
          <div className="flex gap-1">
            <span>{review.userName}</span>
            <Rating value={review.overallRating} />
          </div>
        </div>
      </div>

      {contextMenuVisible && pathname === "/profile" && (
        <div
          ref={contextMenuRef}
          className="absolute border border-gray-500 rounded-md shadow"
          style={{
            top: contextMenuPosition.top,
            left: contextMenuPosition.left,
            zIndex: 1000,
          }}
        >
          <button
            onClick={handleEditReview}
            className="bg-blue-500 p-2 flex justify-center rounded-t items-center hover:bg-blue-400 transition-colors"
          >
            <FaEdit color="white" size={20} />
          </button>
          <button
            onClick={handleDeleteReview}
            className="bg-red-500 p-2 flex justify-center rounded-b items-center hover:bg-red-400 transition-colors"
          >
            <FaTrash color="white" size={20} />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalVisible && (
        <DeleteConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ReviewCard;
