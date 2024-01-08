// utils.js
export const getRatingColor = (overallRating) => {
  switch (overallRating) {
    case 10:
      return "text-pink-400";
    case 9:
      return "text-yellow-500";
    case 8:
      return "text-purple-500";
    case 7:
      return "text-blue-500";
    case 6:
      return "text-green-500";
    case 5:
      return "text-orange-400";
    case 4:
      return "text-orange-600";
    case 3:
      return "text-red-500";
    case 2:
      return "text-orange-800";
    case 1:
      return "text-gray-500";
    default:
      return "text-gray-800";
  }
};
