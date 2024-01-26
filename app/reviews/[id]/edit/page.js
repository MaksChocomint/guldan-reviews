"use client";
import Layout from "@/components/Layout";
import EditForm from "@/components/EditForm";

const New = () => {
  return (
    <Layout>
      <h1 className="text-center text-3xl font-bold">
        Редактирование рецензии
      </h1>
      <EditForm />
    </Layout>
  );
};

export default New;
