import { EyeIcon, StarIcon } from "lucide-react";

type Book = {
  title: string;
  cover_image: string;
  authors: { name: string }[];
  reviews: { rating: number }[];
  copies?: { status: string; copyId?: string; issuedTo?: string ;issuedDate:string;returnDate:string }[]; // extended for issued view
};

type User = {
  username: string;
  id: number;
  status: "Active" | "Inactive";
};

type ItemTileProps = {
  item: Book | User ;
  type: "book" | "user";
  onClick: () => void;
  subtype?: "normal" | "issued"; // new
};

const AdminItemTile = ({ item, type, onClick, subtype = "normal" }: ItemTileProps) => {
  const isBook = type === "book";
  const isIssuedBook = isBook && subtype === "issued";

  return (
    <div
      className="flex items-start gap-4 py-4 border-b cursor-pointer"
      onClick={onClick}
    >
      {isBook ? (
        <img
          src={(item as Book).cover_image}
          alt={(item as Book).title}
          className="w-16 h-24 rounded shadow object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700 text-xl shadow">
          {(item as User).username[0].toUpperCase()}
        </div>
      )}

      <div className="flex-1">
        {isBook ? (
          <>
            <h3 className="text-lg font-semibold text-purple-700">
              {(item as Book).title}
            </h3>
            <p className="text-sm text-gray-600">
              by {(item as Book).authors.map((a) => a.name).join(", ")}
            </p>

            {!isIssuedBook ? (
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    (item as Book).copies?.[0]?.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {(item as Book).copies?.[0]?.status || "Unknown"}
                </span>

                <div className="flex items-center text-yellow-600 text-sm font-medium gap-1">
                  <StarIcon className="w-4 h-4 fill-yellow-500 stroke-none" />
                  {(
                    (item as Book).reviews.reduce((sum, r) => sum + r.rating, 0) /
                    (item as Book).reviews.length
                  ).toFixed(1)}{" "}
                  <span className="text-gray-500">
                    ({(item as Book).reviews.length} reviews)
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex  gap-3 mt-2 text-sm text-gray-700">
                <div>
                  <span className="font-medium text-gray-500">Copy ID: </span>
                  {(item as Book).copies?.[0]?.copyId || "N/A"}
                </div>
                <div>
                  <span className="font-medium text-gray-500">Issued To: </span>
                  {(item as Book).copies?.[0]?.issuedTo || "N/A"}
                </div>
                <div>
                  <span className="font-medium text-gray-500">Issued Date:</span>
                  {(item as Book).copies?.[0]?.issuedDate || "N/A"}
                </div>
                <div>
                  <span className="font-medium text-gray-500">Return Date: </span>
                  {(item as Book).copies?.[0]?.returnDate || "N/A"}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-purple-700">
              {(item as User).username}
            </h3>
            <p className="text-sm text-gray-500">User ID: {(item as User).id}</p>
            <span
              className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${
                (item as User).status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {(item as User).status}
            </span>
          </>
        )}
      </div>

      {!subtype==="issued" && <button className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-md font-medium shadow hover:bg-purple-200 transition flex items-center gap-1">
        <EyeIcon className="w-4 h-4" />
        View Details
      </button>}
    </div>
  );
};

export default AdminItemTile;
