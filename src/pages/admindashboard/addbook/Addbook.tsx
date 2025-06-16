import React, { useState } from 'react'
import "./Addbook.css"
const Addbook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    description: "",
    image: null,
  });

  const handleSubmit=()=>{
    alert("book added")
  }
  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-10 ">
      <form className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md space-y-6" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-2xl font-bold text-purple-700">Add New Book</h2>
          <p className="text-gray-500 text-sm">Fill the details to add a new book manually.</p>
        </div>

        {/* Title and Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Book Title</label>
            <input type="text" placeholder="Book Title" className="mt-1 w-full inputfield" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Author</label>
            <input type="text" placeholder="Author Name" className="mt-1 w-full inputfield" />
          </div>
        </div>

        {/* ISBN and Genre */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">ISBN</label>
            <input type="text" placeholder="ISBN Number" className="mt-1 w-full inputfield" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Genre</label>
            <input type="text" placeholder="Enter book genre" className="mt-1 w-full inputfield" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700">Book Description</label>
          <textarea placeholder="Enter book description" className="mt-1 w-full input h-28 resize-none inputfield" />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm font-medium text-gray-700">Book Image</label>
          <input type="file" className="mt-1 w-full inputfield" />
        </div>

        {/* Office and Shelf */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Office</label>
            <select className="mt-1 w-full input">
              <option>Select Office</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Shelf</label>
            <select className="mt-1 w-full input">
              <option>Select Office first</option>
            </select>
          </div>
        </div> */}

        {/* Status */}
        {/* <div>
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select className="mt-1 w-full input">
            <option>Available</option>
            <option>Unavailable</option>
          </select>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
export default Addbook;
