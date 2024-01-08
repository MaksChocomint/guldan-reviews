"use client";
import { getReviewById } from "@/actions/getActions";
import { setViews } from "@/actions/setActions";
import AudioPlayer from "@/components/AudioPlayer";
import CommentSection from "@/components/Comment/CommentSection";
import Layout from "@/components/Layout";
import Rate from "@/components/Rate";
import Image from "next/image";
import Rating from "@/components/Rating";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getRatingColor } from "@/utils/getRatingColor";

const ReviewPage = () => {
  const style = useSelector((state) => state.styles);
  const pathname = usePathname();
  const id = pathname.split("/").slice(-1)[0];

  const [review, setReview] = useState();

  const fetchData = async () => {
    try {
      const review = await getReviewById(id);
      setReview(review);
    } catch (error) {
      console.error("Ошибка при получении рецензии:", error);
    }
  };

  const setIsViewed = async () => {
    await setViews(id);
  };

  useEffect(() => {
    fetchData();
    setIsViewed();
  }, []);

  return (
    <Layout>
      {review && (
        <div className="pb-10">
          <h1 className="text-center text-3xl font-bold">{review.name}</h1>
          <div className="relative mt-5 h-[550px] w-full">
            <Image
              src={review.image}
              fill={true}
              quality={100}
              alt="review"
              className="object-cover object-top-center"
              sizes="100vw"
            />
            {review.audio && <AudioPlayer audioUrl={review.audio} />}
            <Rate review={review} setReview={setReview} />
          </div>
          <div className="mt-5 text-lg text-justify leading-snug">
            {review.review.split("\n").map((paragraph, index) => (
              <p className="mb-2" key={index}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className={`h-1 w-full ${style.background}`}></div>
          <div className="mt-5 text-2xl text-center font-medium">
            <h2 className="text-3xl ">Оценка от {review.userName + "'а"}</h2>
            <div className="mt-3 flex flex-col">
              <Rating label="Сюжет" value={review.storyRating} />
              <Rating label="Персонажи" value={review.charactersRating} />
              <Rating label="Графика" value={review.graphicsRating} />
              <Rating label="Музыка" value={review.musicRating} />
              <div className="mt-2 font-semibold text-3xl text-center">
                Итоговая оценка -{" "}
                <span
                  className={`${getRatingColor(
                    review.overallRating
                  )} text-4xl font-bold`}
                >
                  {review.overallRating}
                </span>
              </div>
            </div>
          </div>
          <div className={`h-1 mt-4 w-full ${style.background}`}></div>
          <CommentSection reviewId={id} />
        </div>
      )}
    </Layout>
  );
};

export default ReviewPage;
