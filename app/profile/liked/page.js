"use client";
import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import ReviewCard from "@/components/ReviewCard";
import { getLikedReviews } from "@/actions/getActions";
import { useSession } from "next-auth/react";

const Liked = () => {
  const [reviewList, setReviewList] = useState([]);
  const { data: session } = useSession();

  const fetchData = async () => {
    try {
      const reviews = await getLikedReviews(session);
      setReviewList(reviews);
      console.log(reviewList);
    } catch (error) {
      console.error("Ошибка при получении рецензий:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center text-3xl font-bold">Понравившиеся рецензии</h1>
      <div className="mt-10 grid grid-cols-3 gap-5">
        {reviewList &&
          reviewList.map((review, id) => {
            return (
              <ReviewCard
                key={review._id}
                review={review}
                id={id}
                setReviewList={setReviewList}
              />
            );
          })}
      </div>
    </Layout>
  );
};

export default Liked;
