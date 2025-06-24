import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";
import RelocateModal from "../../../components/RelocateBook";
import AuthorGenreSelect from "../../../components/AuthorGenreSelect";
import {
  useDeleteBookMutation,
  useEditBookMutation,
  useGetBookDetailsQuery,
} from "../../../api-service/book/book.api";
import BookMeta from "../../../components/bookdetails/BookMeta";
import BookActions from "../../../components/bookdetails/ BookActions";
import BookDetailsFields from "../../../components/bookdetails/BookDetailsFields";
import BookHeader from "../../../components/bookdetails/BookHeader";



const AdminBookDetailCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: bookFromDb, isLoading, isError } = useGetBookDetailsQuery(id);
  const [deleteBook] = useDeleteBookMutation();
  const [editBook] = useEditBookMutation();

  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    if (bookFromDb) {
      setBook(bookFromDb);
      setSelectedAuthors(
        bookFromDb.authors?.map((a) => ({ value: a.id, label: a.name })) || []
      );
      setSelectedGenres(
        bookFromDb.genres?.map((g) => ({
          value: g.id,
          label: g.name,
          description: g.description,
        })) || []
      );
    }
  }, [bookFromDb]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
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
      toast.error("Failed to save book. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const confirm = window.confirm("Are you sure you want to delete this book?");
    if (!confirm) return;

    try {
      await deleteBook(id).unwrap();
      toast.info("Book deleted successfully");
      navigate("/admin/books/book-list");
    } catch (err) {
      console.log("🚀 ~ handleDelete ~ err:", err)
      toast.error("Error deleting book. Please try again.");
    }
  };

  const handleAddCopy = () => {
    setModalOpen(true);
  };

  if (isLoading) return <LoadingSpinner message="Loading Book Detail" />;
  if (isError || !book) return <div className="text-center text-red-600">Book not found.</div>;

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
          <BookHeader book={book} />
          <BookDetailsFields
            book={book}
            isEditing={isEditing}
            handleChange={handleChange}
            selectedAuthors={selectedAuthors}
            selectedGenres={selectedGenres}
            setSelectedAuthors={setSelectedAuthors}
            setSelectedGenres={setSelectedGenres}
          />
          <BookMeta book={book} />
          <BookActions
            isEditing={isEditing}
            handleDelete={handleDelete}
            handleSave={handleSave}
            setIsEditing={setIsEditing}
            handleAddCopy={handleAddCopy}
          />
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
