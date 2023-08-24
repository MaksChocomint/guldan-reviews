import React from "react";
import Image from "next/image";
import AudioPlayer from "./AudioPlayer";

const ReviewCard = ({ review }) => {
  return (
    <div className="flex flex-col items-center w-full h-64 bg-zinc-600 border-4 border-zinc-700 overflow-hidden rounded-b-xl">
      <div className="relative h-5/6 w-[600px] overflow-hidden">
        <Image
          src={review.image}
          fill={true}
          objectFit="cover"
          objectPosition="50% 30%"
          quality={50}
          alt="review"
        />
        <AudioPlayer audioUrl={review.audio} />
      </div>
      <div className="text-white w-full h-1/6 px-2 flex justify-between items-center">
        <div className="flex flex-col justify-center text-base font-medium tracking-wider text-white">
          {review.name}
        </div>
        <div className="flex gap-1 items-end">
          <Image
            src={review.userAvatar}
            width={35}
            height={35}
            quality={100}
            alt="avatar"
            className="border-2 rounded-sm border-zinc-500"
          />
          <div className="">
            {review.userName}{" "}
            <span className="font-semibold">
              -{" "}
              <span
                className={`${
                  review.overallRating == 10
                    ? "text-pink-400"
                    : review.overallRating == 9
                    ? "text-yellow-500"
                    : review.overallRating == 8
                    ? "text-purple-500"
                    : review.overallRating == 7
                    ? "text-blue-500"
                    : review.overallRating == 6
                    ? "text-green-500"
                    : review.overallRating == 5
                    ? "text-orange-400"
                    : review.overallRating == 4
                    ? "text-orange-600"
                    : review.overallRating == 3
                    ? "text-red-500"
                    : review.overallRating == 2
                    ? "text-orange-800"
                    : review.overallRating == 1
                    ? "text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {review.overallRating}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;