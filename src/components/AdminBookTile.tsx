import { EyeIcon, StarIcon } from "lucide-react";

const AdminBookTile = ({ book, onClick }: { book: any; onClick: () => void }) => {
  const averageRating = (
    book.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / book.reviews.length
  ).toFixed(1);

  const totalReviews = book.reviews.length;
  const authorNames = book.authors.map((a: any) => a.name).join(", ");
  const status = book.copies?.[0]?.status || "Unknown";

  return (
    <div className="flex items-start gap-4 py-4 border-b cursor-pointer" onClick={onClick}>
      <img
        src={book.cover_image}
        alt={book.title}
        className="w-16 h-24 rounded shadow object-cover"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-purple-700">{book.title}</h3>
        <p className="text-sm text-gray-600">by {authorNames}</p>

        <div className="flex items-center gap-2 mt-2">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              status === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {status}
          </span>

          <div className="flex items-center text-yellow-600 text-sm font-medium gap-1">
            <StarIcon className="w-4 h-4 fill-yellow-500 stroke-none" />
            {averageRating}{" "}
            <span className="text-gray-500">({totalReviews} reviews)</span>
          </div>
        </div>
      </div>

      <button className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-md font-medium shadow hover:bg-purple-200 transition flex items-center gap-1">
        <EyeIcon className="w-4 h-4" />
        View Details
      </button>
    </div>
  );
};

export default AdminBookTile;
