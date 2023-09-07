import Layout from "@/components/Layout";
import ProfileSettings from "@/components/Settings/ProfileSettings";
import React from "react";

const Settings = () => {
  return (
    <Layout>
      <h1 className="text-center text-3xl font-bold">Настройки</h1>
      <div className="grid grid-cols-2 mt-10">
        <ProfileSettings />
      </div>
    </Layout>
  );
};

export default Settings;
