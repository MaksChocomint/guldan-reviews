"use client";
import { getReviewById } from "@/actions/uploadActions";
import AudioPlayer from "@/components/AudioPlayer";
import Layout from "@/components/Layout";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ReviewPage = () => {
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

  useEffect(() => {
    fetchData();
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
          </div>
          <div className="mt-5 text-lg text-justify leading-snug">
            {review.review.split("\n").map((paragraph, index) => (
              <p className="mb-2" key={index}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-5 text-2xl text-center font-medium">
            <h2 className="text-3xl ">Оценка от {review.userName + "'а"}</h2>
            <div className="mt-3 flex flex-col">
              <div className="text-center">
                Сюжет -{" "}
                <span
                  className={`${
                    review.storyRating == 10
                      ? "text-pink-400"
                      : review.storyRating == 9
                      ? "text-yellow-500"
                      : review.storyRating == 8
                      ? "text-purple-500"
                      : review.storyRating == 7
                      ? "text-blue-500"
                      : review.storyRating == 6
                      ? "text-green-500"
                      : review.storyRating == 5
                      ? "text-orange-400"
                      : review.storyRating == 4
                      ? "text-orange-600"
                      : review.storyRating == 3
                      ? "text-red-500"
                      : review.storyRating == 2
                      ? "text-orange-800"
                      : review.storyRating == 1
                      ? "text-gray-500"
                      : "text-gray-800"
                  } text-3xl font-bold`}
                >
                  {review.storyRating}
                </span>
              </div>
              <div className="text-center">
                Персонажи -{" "}
                <span
                  className={`${
                    review.charactersRating == 10
                      ? "text-pink-400"
                      : review.charactersRating == 9
                      ? "text-yellow-500"
                      : review.charactersRating == 8
                      ? "text-purple-500"
                      : review.charactersRating == 7
                      ? "text-blue-500"
                      : review.charactersRating == 6
                      ? "text-green-500"
                      : review.charactersRating == 5
                      ? "text-orange-400"
                      : review.charactersRating == 4
                      ? "text-orange-600"
                      : review.charactersRating == 3
                      ? "text-red-500"
                      : review.charactersRating == 2
                      ? "text-orange-800"
                      : review.charactersRating == 1
                      ? "text-gray-500"
                      : "text-gray-800"
                  } text-3xl font-bold`}
                >
                  {review.charactersRating}
                </span>
              </div>
              <div className="text-center">
                Графика -{" "}
                <span
                  className={`${
                    review.graphicsRating == 10
                      ? "text-pink-400"
                      : review.graphicsRating == 9
                      ? "text-yellow-500"
                      : review.graphicsRating == 8
                      ? "text-purple-500"
                      : review.graphicsRating == 7
                      ? "text-blue-500"
                      : review.graphicsRating == 6
                      ? "text-green-500"
                      : review.graphicsRating == 5
                      ? "text-orange-400"
                      : review.graphicsRating == 4
                      ? "text-orange-600"
                      : review.graphicsRating == 3
                      ? "text-red-500"
                      : review.graphicsRating == 2
                      ? "text-orange-800"
                      : review.graphicsRating == 1
                      ? "text-gray-500"
                      : "text-gray-800"
                  } text-3xl font-bold`}
                >
                  {review.graphicsRating}
                </span>
              </div>
              <div className="text-center">
                Музыка -{" "}
                <span
                  className={`${
                    review.musicRating == 10
                      ? "text-pink-400"
                      : review.musicRating == 9
                      ? "text-yellow-500"
                      : review.musicRating == 8
                      ? "text-purple-500"
                      : review.musicRating == 7
                      ? "text-blue-500"
                      : review.musicRating == 6
                      ? "text-green-500"
                      : review.musicRating == 5
                      ? "text-orange-400"
                      : review.musicRating == 4
                      ? "text-orange-600"
                      : review.musicRating == 3
                      ? "text-red-500"
                      : review.musicRating == 2
                      ? "text-orange-800"
                      : review.musicRating == 1
                      ? "text-gray-500"
                      : "text-gray-800"
                  } text-3xl font-bold`}
                >
                  {review.musicRating}
                </span>
              </div>
              <div className="mt-2 font-semibold text-3xl text-center">
                Итоговая оценка -{" "}
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
                  } text-4xl font-bold`}
                >
                  {review.overallRating}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ReviewPage;
