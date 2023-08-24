"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ReviewPage = () => {
  const router = useRouter();
  console.log(router);
  //   const { _id } = router.query;
  //   console.log(_id);
  return <div>ReviewPage</div>;
};

export default ReviewPage;
