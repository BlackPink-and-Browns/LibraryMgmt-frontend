import React from "react";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import BookImagePreview from "./BookImagePreview";
import AuthorGenreSelect from "../AuthorGenreSelect";

type OptionType = {
  label: string;
  value: number | string;
  description?: string;
};

type AddBookFormProps = {
  formData: {
    title: string;
    author: string;
    isbn: string;
    genre: string;
    description: string;
    image: File | null;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  handleSubmit: (e: React.FormEvent) => void;
  selectedAuthors: OptionType[];
  selectedGenres: OptionType[];
  setSelectedAuthors: (options: OptionType[]) => void;
  setSelectedGenres: (options: OptionType[]) => void;
};

const AddBookForm: React.FC<AddBookFormProps> = ({
  formData,
  handleChange,
  handleImageChange,
  imagePreview,
  handleSubmit,
  selectedAuthors,
  selectedGenres,
  setSelectedAuthors,
  setSelectedGenres,
  
}) => (
  
  <form
    className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md space-y-6"
    onSubmit={handleSubmit}
  >
    <div>
      
      <h2 className="text-2xl font-bold text-purple-700">Add New Book</h2>
      <p className="text-gray-500 text-sm">
        Fill the details to add a new book manually.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Book Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Book Title"
      />
      <InputField
        label="ISBN"
        name="isbn"
        value={formData.isbn}
        onChange={handleChange}
        placeholder="ISBN Number"
      />
    </div>

    {/* Author & Genre Multi-Select */}
    <AuthorGenreSelect
      selectedAuthors={selectedAuthors}
      selectedGenres={selectedGenres}
      onAuthorsChange={setSelectedAuthors}
      onGenresChange={setSelectedGenres}
    />

    <TextareaField
      label="Book Description"
      name="description"
      value={formData.description}
      onChange={handleChange}
      placeholder="Enter book description"
    />

    <BookImagePreview imagePreview={imagePreview} />

    <div>
      <label className="text-sm font-medium text-gray-700">
        {imagePreview ? "Choose Another image ?" : "Add Book Image"}
      </label>
      <input
        type="file"
        onChange={handleImageChange}
        className="mt-1 w-full inputfield"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
    >
      Add Book
    </button>
  </form>
);

export default AddBookForm;
