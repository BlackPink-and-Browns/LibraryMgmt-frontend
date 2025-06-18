import React from "react";

const BookImagePreview = ({ imagePreview }) => (
  imagePreview ? (
    <div className="mt-4">
      <p className="text-sm text-gray-700 mb-1">Preview:</p>
      <img
        src={imagePreview}
        alt="Book preview"
        className="w-32 h-48 object-cover rounded shadow"
      />
    </div>
  ) : null
);

export default BookImagePreview;
