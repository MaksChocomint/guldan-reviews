import { AiFillDislike, AiFillLike } from "react-icons/ai";

const handleLikeClick = (e) => {
  e.stopPropagation();
};
const handleDislikeClick = (e) => {
  e.stopPropagation();
};

const Rate = () => {
  return (
    <div className="flex gap-2 absolute z-50 right-2 top-2 items-center">
      <div className="text-base font-semibold text-zinc-300 drop-shadow-[0_0.4px_0.4px_rgba(0,0,0,0.5)]">
        {0}
      </div>
      <AiFillLike
        size={20}
        className="text-zinc-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer transition-colors hover:text-green-300"
        onClick={handleLikeClick}
      />
      <div className="text-base font-semibold text-zinc-300 drop-shadow-[0_0.4px_0.4px_rgba(0,0,0,0.5)]">
        {0}
      </div>
      <AiFillDislike
        size={20}
        className="text-zinc-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer transition-colors hover:text-red-300"
        onClick={handleDislikeClick}
      />
    </div>
  );
};

export default Rate;
