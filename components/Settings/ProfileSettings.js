"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ApplyButton from "../ApplyButton";
import React, { useState } from "react";
import { uploadProfileData } from "@/actions/uploadActions";

const ProfileSettings = () => {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState({
    email: session?.user?.email || "",
    nickname: session?.user?.name || "",
    avatar: session?.user?.image || null,
  });

  const [isNicknameChanged, setIsNicknameChanged] = useState(false);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);

  const handleChange = (e) => {
    setProfileData((prevProfileData) => {
      const newProfileData = {
        ...prevProfileData,
        [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
      };
      return newProfileData;
    });

    if (e.target.name === "nickname") {
      setIsNicknameChanged(true);
    } else if (e.target.name === "avatar") {
      setIsAvatarChanged(true);
    }
  };

  const handleApplyNickname = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", session?.user?.email);
    formData.append("data", profileData.nickname);
    formData.append("data", session?.user?.image);
    await uploadProfileData(formData);
    setIsNicknameChanged(false);
  };

  const handleApplyAvatar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", session?.user?.email);
    formData.append("data", session?.user?.name);
    formData.append("files", profileData.avatar);
    await uploadProfileData(formData);
    setIsAvatarChanged(false);
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold">Профиль</h2>
      <div className="mt-5 flex flex-col gap-5">
        <div className="flex gap-6 items-center relative">
          <label htmlFor="nickname" className="text-xl font-medium w-full">
            Поменяйте никнейм
          </label>
          <input
            type="text"
            id="name"
            name="nickname"
            value={profileData.nickname}
            onChange={handleChange}
            className="w-full p-2 rounded-md"
            autoComplete="off"
          />
          <ApplyButton
            isClickable={isNicknameChanged}
            handleApplyNickname={handleApplyNickname}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-4 justify-center relative">
            <label htmlFor="avatar">
              <p className="text-xl font-medium">Загрузите новый аватар</p>
            </label>
            <ApplyButton
              isClickable={isAvatarChanged}
              handleApplyAvatar={handleApplyAvatar}
            />
            <input
              type="file"
              id="image"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          {session && (
            <Image
              src={session.user?.image}
              alt="avatar"
              width={130}
              height={130}
              className="rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
