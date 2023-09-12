import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const ApplyButton = ({
  isClickable,
  handleApplyAvatar,
  handleApplyNickname,
}) => {
  const style = useSelector((state) => state.styles);
  const buttonStyle = isClickable
    ? "text-green-500 transition-all hover:bg-green-600"
    : "cursor-default";

  return (
    <button
      className={`flex justify-center items-center absolute top-1/2 right-1 -translate-y-1/2 z-50 p-2 rounded-full  ${buttonStyle} ${
        !isClickable && style.icon
      }`}
      disabled={!isClickable}
      onClick={handleApplyAvatar || handleApplyNickname}
    >
      <BsFillCheckCircleFill size={32} className="font-bold text-lg" />
    </button>
  );
};

export default ApplyButton;
