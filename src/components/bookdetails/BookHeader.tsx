import clsx from "clsx";

const BookHeader = ({ book }:{book:any}) => {
  const status = book?.is_available ? "Available" : "Unavailable";
  const averageRating = book.avg_rating || 0;

  return (
    <div className="flex justify-between items-start">
      <span
        className={clsx(
          "text-sm px-3 py-1 rounded-full font-semibold",
          status === "Available"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        )}
      >
        {status}
      </span>
      <span className="flex items-center gap-1 text-yellow-500 font-medium">
        ⭐ {averageRating.toFixed(1)}{" "}
        <span className="text-gray-400">
          ({book.reviews.length} reviews)
        </span>
      </span>
    </div>
  );
};


export default BookHeader