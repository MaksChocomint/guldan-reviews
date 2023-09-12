import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SortSelect = ({ options, setSort }) => {
  const style = useSelector((state) => state.styles);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    toggleDropdown();
  };

  useEffect(() => {
    if (selectedOption === "Новые") {
      setSort("-createdAt");
    } else if (selectedOption === "Популярные") {
      setSort("-views");
    }
  }, [selectedOption]);

  return (
    <div className="relative inline-block text-center z-[100] ">
      <div
        className={`${
          style.foreground.slice(0, -3) +
          (Number(style.foreground.slice(-3)) + 100)
        } ${
          style.btnHover
        } text-lg rounded-md cursor-pointer w-auto py-2 px-4 select-none`}
        onClick={toggleDropdown}
      >
        {selectedOption}
        <span className="ml-2">&#9660;</span>
      </div>
      {isOpen && (
        <ul
          className={`absolute left-0 mt-1 border rounded-md ${style.foreground} border-zinc-600 z-[100]`}
        >
          {options.map((option) => (
            <li
              key={option}
              className={`cursor-pointer py-2 px-4 rounded-md ${style.optionHover} select-none`}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionClick(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortSelect;
