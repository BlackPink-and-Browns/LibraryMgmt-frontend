import React, { useEffect, useState } from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import RelocateModal from "../../../components/RelocateBook";
import {
  useDeleteBookMutation,
  useEditBookMutation,
  useGetBookDetailsQuery,
} from "../../../api-service/book/book.api";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";
import AuthorGenreSelect from "../../../components/AuthorGenreSelect";

const AdminBookDetailCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: bookFromDb, isLoading, isError } = useGetBookDetailsQuery(id);
  const [deleteBook] = useDeleteBookMutation();
  const [editBook] = useEditBookMutation();
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAuthors, setSelectedAuthors] = useState<OptionType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<OptionType[]>([]);

  useEffect(() => {
    if (bookFromDb) {
      setBook(bookFromDb);

      setSelectedAuthors(
        bookFromDb.authors?.map((author) => ({
          value: author.id,
          label: author.name,
        })) || []
      );

      setSelectedGenres(
        bookFromDb.genres?.map((genre) => ({
          value: genre.id,
          label: genre.name,
          description: genre.description,
        })) || []
      );
    }
  }, [bookFromDb]);

  if (isLoading) return <LoadingSpinner message="Loading Book Detail" />;
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl">Book Not Found</div>
      </div>
    );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "authors") {
      const existingAuthors = book?.authors || [];
      setBook((prev) => ({
        ...prev,
        authors: value.split(",").map((name, i) => {
          const existing = existingAuthors[i];
          return { id: existing?.id || i + 1, name: name.trim() };
        }),
      }));
    } else if (name === "genres") {
      setBook((prev) => ({
        ...prev,
        genres: value.split(",").map((n, i) => ({ id: i + 1, name: n.trim() })),
      }));
    } else {
      setBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    console.log("new book detail", book);
    try {
      const payload = {
        ...book,
        authors: selectedAuthors.map((a) => a.value),
        genres: selectedGenres.map((g) => g.value),
      };
      await editBook({ id: book.id, payload }).unwrap();
      toast.success("Book details saved!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save book:", error);
      toast.error("Failed to save book. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmed) return;

    try {
      await deleteBook(id).unwrap();
      navigate("/admin/books/book-list");
      toast.info("Deleted Succesfully ");
    } catch (err) {
      console.error("Failed to delete book:", err);
      toast.error("Error deleting book. Please try again.");
    }
  };

  const handleAddCopy = () => {
    setModalOpen(true);
  };

  if (!book) {
    return <div className="text-center text-red-600">Book not found.</div>;
  }
  const status = book?.is_available === true ? "Available" : "Unavailable";
  const averageRating = book.avg_rating || 0;

  return (
    <>
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md flex gap-6">
        <div className="w-48">
          <img
            src={book.cover_image}
            alt={book.title}
            className="rounded-md w-full h-auto"
          />
        </div>

        <div className="flex-1 space-y-3">
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

          {isEditing ? (
            <input
              name="title"
              value={book.title}
              onChange={handleChange}
              className="inputfield text-lg font-semibold"
            />
          ) : (
            <h2 className="text-xl font-semibold">{book.title}</h2>
          )}

          <div>
            {/* <strong>Authors:</strong>{" "} */}
            {isEditing ? (
              <AuthorGenreSelect
                selectedAuthors={selectedAuthors}
                selectedGenres={selectedGenres}
                onAuthorsChange={setSelectedAuthors}
                onGenresChange={setSelectedGenres}
              />
            ) : (
              <>
                <div>
                  <strong>Authors:</strong>{" "}
                  {book?.authors.map((a) => a.name).join(", ")}
                </div>
                <div className="mt-4">
                  <strong>Genres:</strong>{" "}
                  {book.genres.map((g) => g.name).join(", ")}
                </div>
              </>
            )}
          </div>
          <div>
            <strong>Copies:</strong> {book.copies.length}
          </div>

          <div>
            <strong>Description:</strong>
            {isEditing ? (
              <textarea
                name="description"
                value={book.description}
                onChange={handleChange}
                className="inputfield mt-1 w-full"
                rows={4}
              />
            ) : (
              <p className="text-gray-600 text-sm mt-1">{book.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 pt-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">📖 ISBN:</span>
              <span>{book.isbn}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">BookId</span>
              <span>{book.id}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded shadow flex items-center gap-2"
              onClick={handleDelete}
            >
              <Trash2Icon size={16} /> Delete Book
            </button>
            {isEditing ? (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded shadow"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-gray-100 text-black px-4 py-2 rounded shadow flex items-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <PencilIcon size={16} /> Edit
              </button>
            )}
            <button
              className="ml-auto bg-purple-600 text-white px-4 py-2 rounded shadow"
              onClick={handleAddCopy}
            >
              + Add Copy
            </button>
          </div>
        </div>
      </div>

      <RelocateModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onRelocate={() => {}}
        mode="add"
        id={book.id}
      />
    </>
  );
};

export default AdminBookDetailCard;
