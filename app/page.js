"use client";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import ReviewCard from "@/components/ReviewCard";
import { getAllReviews } from "@/actions/getActions";
import SortSelect from "@/components/SortSelect";
import { useSelector } from "react-redux";

export default function Home() {
  const [reviewList, setReviewList] = useState([]);
  const [sort, setSort] = useState("-createdAt");
  const [title, setTitle] = useState("Новые рецензии");
  const style = useSelector((state) => state.styles);

  const fetchData = async () => {
    try {
      const reviews = await getAllReviews(sort);
      setReviewList(reviews);
    } catch (error) {
      console.error("Ошибка при получении рецензий:", error);
    }
  };

  useEffect(() => {
    fetchData();
    if (sort === "-createdAt") {
      setTitle("Новые рецензии");
    } else if (sort === "-views") {
      setTitle("Популярные рецензии");
    }
  }, [sort]);

  return (
    <Layout>
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <div className="mt-4 flex w-full justify-end items-center gap-6">
        <div className={`h-1 w-full ${style.background}`}></div>
        <SortSelect options={["Новые", "Популярные"]} setSort={setSort} />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-5">
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
      <div className={`h-1 w-full mt-10 ${style.background}`}></div>
    </Layout>
  );
}
