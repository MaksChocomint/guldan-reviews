"use client";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import ReviewCard from "@/components/ReviewCard";
import { getAllReviews } from "@/actions/getActions";

export default function Home() {
  const [reviewList, setReviewList] = useState([]);
  const [sort, setSort] = useState("-createdAt");
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
    fetchData();
    if (sort === "-createdAt") {
      setTitle("Новые рецензии");
    } else if (sort === "-views") {
      setTitle("Популярные рецензии");
    }
  }, [sort]);

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
  };

  return (
    <Layout>
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <div className="mt-4 flex w-full justify-end items-center gap-6">
        <div className="h-1 w-full bg-zinc-300"></div>
        <select
          id="sortSelect"
          value={sort}
          onChange={handleSortChange}
          className="mt-1 py-2 px-1 text-lg border rounded-md w-auto text-center"
        >
          <option value="-createdAt">Новые</option>
          <option value="-views">Популярные</option>
        </select>
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
      <div className="h-1 w-full bg-zinc-300 mt-10"></div>
    </Layout>
  );
}
