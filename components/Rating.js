// Rating.js
import React from "react";
import { getRatingColor } from "@/utils/getRatingColor";

const Rating = ({ label, value }) => {
  if (label)
    return (
      <div className="text-center">
        {label} -{" "}
        <span className={`font-semibold ${getRatingColor(value)}`}>
          {value}
        </span>
      </div>
    );
  else {
    return (
      <div>
        -{" "}
        <span className={`font-semibold ${getRatingColor(value)}`}>
          {value}
        </span>
      </div>
    );
  }
};

export default Rating;
