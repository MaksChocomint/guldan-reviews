"use client";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReviewCard from "@/components/ReviewCard";
import { getUserReviews } from "@/actions/uploadActions";
import { useSession } from "next-auth/react";

const Profile = () => {
  const [reviewList, setReviewList] = useState([]);
  const { data: session } = useSession();

  const fetchData = async () => {
    try {
      const reviews = await getUserReviews(session);
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
      <h1 className="text-center text-3xl font-bold">Ваши рецензии</h1>
      <div className="mt-10 grid grid-cols-3 gap-5">
        <Link
          href="/profile/new"
          className="bg-green-400 w-full h-64 flex items-center justify-center text-3xl cursor-pointer border-4 border-zinc-700 rounded-b-xl transition-all hover:bg-green-300 hover:border-zinc-400"
        >
          <AiOutlineAppstoreAdd size={70} />
        </Link>
        {reviewList &&
          reviewList.map((review) => {
            return <ReviewCard key={review._id} review={review} />;
          })}
      </div>
    </Layout>
  );
};

export default Profile;
