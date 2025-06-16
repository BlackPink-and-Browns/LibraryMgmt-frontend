import React, { useState } from 'react'

const BulkUpload = () => {
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
            <h2 className="text-2xl font-bold text-purple-700">Bluck Upload Books</h2>
            <p className="text-gray-500 text-sm">Upload Excel(csv,xlsx) file with book details</p>
          </div>
  
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

export default BulkUpload
