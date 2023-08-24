"use client";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import ReviewCard from "@/components/ReviewCard";
import { getAllReviews } from "@/actions/uploadActions";

export default function Home() {
  const [reviewList, setReviewList] = useState([]);

  const fetchData = async () => {
    try {
      const reviews = await getAllReviews();
      setReviewList(reviews);
    } catch (error) {
      console.error("Ошибка при получении рецензий:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center text-3xl font-bold">Топ рецензий</h1>
      <div className="mt-10 mx-5 grid grid-cols-3 gap-5">
        {reviewList.map((review) => {
          return <ReviewCard key={review._id} review={review} />;
        })}
      </div>
    </Layout>
  );
}
