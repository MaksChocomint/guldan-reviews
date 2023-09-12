"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { uploadForm } from "@/actions/uploadActions";
import ButtonSubmit from "./ButtonSubmit";
import { useSelector } from "react-redux";

const UploadForm = () => {
  const { data: session } = useSession();
  const style = useSelector((state) => state.styles);
  const router = useRouter();
  const inputStyle = useMemo(
    () =>
      style.foreground.slice(0, -3) +
      (Number(style.foreground.slice(-3)) + 100),
    [style]
  );

  const [formData, setFormData] = useState({
    userName: session?.user?.name,
    userEmail: session?.user?.email,
    userAvatar: String(session?.user?.image),
    name: "",
    contentType: "anime",
    review: "",
    storyRating: 5,
    charactersRating: 5,
    graphicsRating: 5,
    musicRating: 5,
    overallRating: 5,
    image: null,
    audio: null,
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      userName: session?.user?.name,
      userEmail: session?.user?.email,
      userAvatar: String(session?.user?.image),
    }));
  }, [session]);

  const handleAudioChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      audio: file,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (file && file.size > 1024 * 1024) {
      alert("Загрузите картинку до 1 МБ");
      e.target.value = "";
    } else {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      [
        "storyRating",
        "charactersRating",
        "graphicsRating",
        "musicRating",
      ].includes(name)
    ) {
      const numericValue = parseInt(value);
      if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 10) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: numericValue,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleContentTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      contentType: value,
    }));
  };

  useEffect(() => {
    const newOverallRating = Math.round(
      (formData.storyRating +
        formData.charactersRating +
        formData.graphicsRating +
        formData.musicRating) /
        4
    );

    setFormData((prevData) => ({
      ...prevData,
      overallRating: newOverallRating,
    }));
  }, [
    formData.storyRating,
    formData.charactersRating,
    formData.graphicsRating,
    formData.musicRating,
  ]);

  const handleSubmit = async () => {
    const newFormData = new FormData();
    for (const key in formData) {
      if (typeof formData[key] === "object") {
        if (formData[key] !== null) newFormData.append("files", formData[key]);
      } else {
        newFormData.append("data", formData[key]);
      }
    }

    const res = await uploadForm(newFormData);
    router.push("/profile");
  };

  return (
    <form
      action={handleSubmit}
      className="mt-10 grid grid-cols-2 gap-4 text-lg"
    >
      <div className={`flex gap-12 items-center ${inputStyle}`}>
        <label htmlFor="name" className="text-xl font-medium">
          Название:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          required={true}
          onChange={handleInputChange}
          className={`w-full p-2 rounded-md ${style.input}`}
          autoComplete="off"
        />
      </div>
      <div className={inputStyle}>
        <label className="text-xl font-medium">На что рецензия?</label>
        <div className="flex justify-between w-24 mt-4">
          <label htmlFor="anime">Аниме</label>
          <input
            type="radio"
            id="anime"
            name="contentType"
            value="anime"
            checked={formData.contentType === "anime"}
            onChange={handleContentTypeChange}
          />
        </div>
        <div className="flex justify-between w-24">
          <label htmlFor="series">Сериал</label>
          <input
            type="radio"
            id="series"
            name="contentType"
            value="series"
            checked={formData.contentType === "series"}
            onChange={handleContentTypeChange}
          />
        </div>
        <div className="flex justify-between w-24">
          <label htmlFor="film">Фильм</label>
          <input
            type="radio"
            id="film"
            name="contentType"
            value="film"
            checked={formData.contentType === "film"}
            onChange={handleContentTypeChange}
          />
        </div>
      </div>
      <div className={`flex flex-col gap-4 ${inputStyle}`}>
        <label htmlFor="image">
          <span className="text-xl font-medium">Загрузите картинку</span> к
          своей рецензии, например аниме-арт:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          required={true}
          onChange={handleImageChange}
        />
      </div>
      <div className={`flex flex-col gap-4 ${inputStyle}`}>
        <label htmlFor="audio">
          <span className="text-xl font-medium">Загрузите озвучку</span> или
          музыкальное сопровождение :3
        </label>
        <input
          type="file"
          id="audio"
          name="audio"
          accept="audio/*"
          onChange={handleAudioChange}
        />
      </div>
      <div className={`col-span-2 ${inputStyle}`}>
        <div className="flex flex-col gap-8 justify-center items-center h-full">
          <div className="w-full">
            <label htmlFor="review" className="text-xl font-medium">
              Ваша рецензия:
            </label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              required={true}
              onChange={handleInputChange}
              className={`w-full resize-none h-96 overflow-y-auto mt-4 py-2 px-4 rounded-md ${style.input}`}
            />
          </div>
        </div>
      </div>
      <div className={`flex flex-col gap-2 ${inputStyle}`}>
        <label className="text-xl font-medium">Оценки по критериям:</label>
        <div className="flex justify-between w-56 mt-4">
          <label htmlFor="storyRating">Сюжет:</label>
          <input
            type="number"
            id="storyRating"
            name="storyRating"
            min="1"
            max="10"
            value={formData.storyRating}
            onChange={handleInputChange}
            className={`p-1 text-center rounded-md ${style.input}`}
          />
        </div>
        <div className="flex justify-between w-56">
          <label htmlFor="charactersRating">Персонажи:</label>
          <input
            type="number"
            id="charactersRating"
            name="charactersRating"
            min="1"
            max="10"
            value={formData.charactersRating}
            onChange={handleInputChange}
            className={`p-1 text-center rounded-md ${style.input}`}
          />
        </div>
        <div className="flex justify-between w-56">
          <label htmlFor="graphicsRating">Графика:</label>
          <input
            type="number"
            id="graphicsRating"
            name="graphicsRating"
            min="1"
            max="10"
            value={formData.graphicsRating}
            onChange={handleInputChange}
            className={`p-1 text-center rounded-md ${style.input}`}
          />
        </div>
        <div className="flex justify-between w-56">
          <label htmlFor="musicRating">Музыка:</label>
          <input
            type="number"
            id="musicRating"
            name="musicRating"
            min="1"
            max="10"
            value={formData.musicRating}
            onChange={handleInputChange}
            className={`p-1 text-center rounded-md ${style.input}`}
          />
        </div>
      </div>
      <div
        className={`text-2xl font-semibold flex gap-4 items-center ${inputStyle}`}
      >
        Итоговая оценка:
        <div
          className={`${
            formData.overallRating == 10
              ? "text-pink-400"
              : formData.overallRating == 9
              ? "text-yellow-500"
              : formData.overallRating == 8
              ? "text-purple-500"
              : formData.overallRating == 7
              ? "text-blue-500"
              : formData.overallRating == 6
              ? "text-green-500"
              : formData.overallRating == 5
              ? "text-orange-400"
              : formData.overallRating == 4
              ? "text-orange-600"
              : formData.overallRating == 3
              ? "text-red-500"
              : formData.overallRating == 2
              ? "text-orange-800"
              : formData.overallRating == 1
              ? "text-gray-500"
              : "text-gray-800"
          } text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}
        >
          {formData.overallRating}
        </div>
      </div>

      <div className={`col-span-2 ${inputStyle}`}>
        <div className="flex flex-col gap-8 justify-center items-center h-full">
          <ButtonSubmit className="bg-green-400 center w-1/3 h-32 flex items-center justify-center text-3xl transition-colors cursor-pointer hover:bg-green-300">
            <AiOutlineAppstoreAdd size={40} />
          </ButtonSubmit>
        </div>
      </div>
    </form>
  );
};

export default UploadForm;
