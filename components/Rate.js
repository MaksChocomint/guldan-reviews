import { AiFillDislike, AiFillLike } from "react-icons/ai";

const Rate = () => {
  return (
    <div className="flex gap-4 absolute z-50 right-2 top-2">
      <AiFillLike
        size={20}
        className="text-zinc-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer transition-colors hover:text-green-300"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      <AiFillDislike
        size={20}
        className="text-zinc-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer transition-colors hover:text-red-300"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </div>
  );
};

export default Rate;
