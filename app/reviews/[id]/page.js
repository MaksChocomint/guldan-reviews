"use client";
import { getReviewById } from "@/actions/uploadActions";
import Layout from "@/components/Layout";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ReviewPage = () => {
  const router = useRouter();
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
        <div>
          <h1 className="text-center text-3xl font-bold">{review.name}</h1>
          <div className="relative mt-5 h-[450px] w-full overflow-hidden">
            <Image
              src={review.image}
              fill={true}
              quality={100}
              alt="review"
              className="object-cover object-top-center"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ReviewPage;
