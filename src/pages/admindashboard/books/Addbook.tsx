import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthorGenreSelect from "../../../components/AuthorGenreSelect";
import "./Addbook.css";
import AddBookForm from "../../../components/addbook/AddBookForm";
import { useCreateBookMutation } from "../../../api-service/book/book.api";
import {
  useCreateGenreMutation,
  useGetAllGenreQuery,
} from "../../../api-service/genre/genre.api";
import {
  useCreateAuthorMutation,
  useGetAllAuthorsQuery,
} from "../../../api-service/author/author.api";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast } from "react-toastify";

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

  const [createAuthor] = useCreateAuthorMutation();
  const [createGenre] = useCreateGenreMutation();
  const [createBook] = useCreateBookMutation();

  const { data: authors,refetch: refetchAuthors } = useGetAllAuthorsQuery({});
  const { data: genres,refetch:refetchGenre } = useGetAllGenreQuery({});

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
          toast.error("Book Not Found");
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

          setSelectedAuthors(
            (book.authors || []).map((name) => ({
              label: name,
              value: name,
            }))
          );

          setSelectedGenres(
            (book.categories || []).map((name) => ({
              label: name,
              value: name,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        toast.error("Failed to fetch book",error.data);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resolveAuthorsRaw = await Promise.all(
      selectedAuthors.map(async (a) => {
        const condition =
          authors?.some((auth) => auth.name === a.label) ?? false;
        try {
          if (condition) {
            const user = authors?.find((auth) => auth.name === a.label);
            return user.id;
          } else {
            console.log("in else");
          await createAuthor({ name: a.label }).unwrap();
          const updated = await refetchAuthors(); // ⬅️ Re-fetch authors
          const found = updated.data?.find((auth) => auth.name === a.label);
          return found?.id ?? null;
          }
        } catch (err) {
          const existing = authors?.find((auth) => auth.name === a.label);
          return existing?.id ?? null;
        }
      })
    );

    const resolveGenresRaw = await Promise.all(
      selectedGenres.map(async (g) => {
        try {
          const newGenre = await createGenre({
            name: g.label,
            description: "Auto-filled genre",
          }).unwrap();
          console.log("🚀 ~ selectedGenres.map ~ newGenre:", newGenre)
          
          return newGenre?.id;
        } catch (err) {
          const existing = genres?.find((gen) => gen.name === g.label);
          return existing?.id ?? null;
        }
      })
    );

    const validAuthorIds = resolveAuthorsRaw.filter((id): id is number => !!id);
    console.log("🚀 ~ handleSubmit ~ validAuthorIds:", validAuthorIds)
    const validGenreIds = resolveGenresRaw.filter((id): id is number => !!id);
    console.log("🚀 ~ handleSubmit ~ validGenreIds:", validGenreIds)

    const payload = {
      title: formData.title,
      isbn: formData.isbn,
      description: formData.description,
      cover_image: imagePreview ?? "",
      authors: validAuthorIds,
      genres: validGenreIds,
    };

    console.log("Final Payload:", payload);

    try {
      await createBook(payload).unwrap();
      toast.success("Book Added")
      navigate("/admin/books/book-list")
    } catch (err) {
      console.error("Failed to add book:",err.data.error );
      toast.error("Failed to add book")

    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-10">
      {loading ? (
        <LoadingSpinner message="Loading Detail"/>
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
