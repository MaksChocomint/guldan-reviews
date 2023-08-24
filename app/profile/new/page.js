"use client";
import Layout from "@/components/Layout";
import UploadForm from "@/components/UploadForm";

const New = () => {
  return (
    <Layout>
      <h1 className="text-center text-3xl font-bold">Новая рецензия</h1>
      <UploadForm />
    </Layout>
  );
};

export default New;
