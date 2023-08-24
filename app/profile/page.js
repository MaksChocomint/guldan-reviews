"use client";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Layout from "@/components/Layout";
import React from "react";
import Link from "next/link";

const Profile = () => {
  return (
    <Layout>
      <h1 className="text-center text-3xl font-bold">Ваши рецензии</h1>
      <div className="mt-10 grid grid-cols-3 gap-5">
        <Link
          href="/profile/new"
          className="bg-green-400 w-full h-52 flex items-center justify-center text-3xl transition-colors cursor-pointer hover:bg-green-300"
        >
          <AiOutlineAppstoreAdd size={70} />
        </Link>
      </div>
    </Layout>
  );
};

export default Profile;
