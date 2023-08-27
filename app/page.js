"use client";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import ReviewCard from "@/components/ReviewCard";
import { getAllReviews } from "@/actions/getActions";

export default function Home() {
  const [reviewList, setReviewList] = useState([]);
  const [sort, setSort] = useState("-views");
  const [title, setTitle] = useState("Новые рецензии");

  const fetchData = async () => {
    try {
      const reviews = await getAllReviews(sort);
      setReviewList(reviews);
    } catch (error) {
      console.error("Ошибка при получении рецензий:", error);
    }
  };

  useEffect(() => {
    if (sort === "-createdAt") {
      setTitle("Новые рецензии");
    } else if (sort === "-views") {
      setTitle("Популярные рецензии");
    }
  }, [sort]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center text-3xl font-bold">{title}</h1>
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
}
