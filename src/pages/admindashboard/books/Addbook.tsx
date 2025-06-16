import React, { useEffect, useState } from 'react'
import "./Addbook.css"
import { useParams } from 'react-router-dom';

const Addbook = () => {
  const { isbnId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    description: "",
    image: null as File | null,
  });

  // Prefill form with hardcoded data if isbnId exists
  useEffect(() => {
    if (isbnId) {
      setFormData({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: isbnId,
        genre: "Classic Fiction",
        description: "A novel set in the Roaring Twenties, exploring themes of wealth and identity.",
        image: null,
      });
    }
  }, [isbnId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Book added: ${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-10">
      <form
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-2xl font-bold text-purple-700">Add New Book</h2>
          <p className="text-gray-500 text-sm">Fill the details to add a new book manually.</p>
        </div>

        {/* Title and Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Book Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Book Title"
              className="mt-1 w-full inputfield"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author Name"
              className="mt-1 w-full inputfield"
            />
          </div>
        </div>

        {/* ISBN and Genre */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="ISBN Number"
              className="mt-1 w-full inputfield"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Enter book genre"
              className="mt-1 w-full inputfield"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700">Book Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter book description"
            className="mt-1 w-full input h-28 resize-none inputfield"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm font-medium text-gray-700">Book Image</label>
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
    </div>
  );
};

export default Addbook;
