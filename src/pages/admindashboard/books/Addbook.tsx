import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthorGenreSelect from "../../../components/AuthorGenreSelect";
import "./Addbook.css";
import AddBookForm from "../../../components/addbook/AddBookForm";
type OptionType = {
  label: string;
  value: number | string;
  description?: string;
};
const Addbook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

const [selectedAuthors, setSelectedAuthors] = useState<OptionType[]>([]);
const [selectedGenres, setSelectedGenres] = useState<OptionType[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    description: "",
    image: null as File | null,
  });

  useEffect(() => {
    if (!id) return;
    const fetchBookData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${id}`
        );
        const data = await res.json();

        if (data.totalItems === 0) {
          alert("Book Not Found");
          navigate("/admin/books/scan-isbn");
        } else {
          const book = data.items[0].volumeInfo;
          setFormData({
            title: book.title || "",
            author: book.authors?.[0] || "",
            isbn: id,
            genre: book.categories?.[0] || "",
            description: book.description || "",
            image: null,
          });
          setImagePreview(book.imageLinks?.thumbnail || null);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        alert("Failed to fetch book");
        navigate("/admin/books/scan-isbn");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
    setFormData((prev) => ({ ...prev, image: file }));
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    ...formData,
    authorIds: selectedAuthors.map((a) => a.value),
    genreIds: selectedGenres.map((g) => g.value),
  };

  console.log("Submit Payload:", payload);
  // Submit this to backend here
};

  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-10">
      {loading ? (
        <h1 className="text-3xl">Loading...</h1>
      ) : (
        <AddBookForm
          formData={formData}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
          handleSubmit={handleSubmit}
          selectedAuthors={selectedAuthors}
          selectedGenres={selectedGenres}
          setSelectedAuthors={setSelectedAuthors}
          setSelectedGenres={setSelectedGenres}
        />
      )}
    </div>
  );
};

export default Addbook;
