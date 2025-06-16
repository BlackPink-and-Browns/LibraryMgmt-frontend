import { useState } from "react";

const AddShelf = () => {
  const [office, setOffice] = useState("");
  const [shelfLabel, setShelfLabel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!office || !shelfLabel.trim()) {
      return alert("Please fill in both fields");
    }

    alert(`Shelf added: ${shelfLabel} in ${office}`);
    // You can call your API or Redux action here
  };

  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-10">
      <form
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-2xl font-bold text-purple-700">Add Shelf</h2>
          <p className="text-gray-500 text-sm">Select office and enter shelf label</p>
        </div>

        {/* Office Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Office</label>
          <select
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            className="w-full inputfield"
          >
            <option value="">-- Select an Office --</option>
            <option value="Main Campus">Main Campus</option>
            <option value="City Branch">City Branch</option>
            <option value="Science Wing">Science Wing</option>
          </select>
        </div>

        {/* Shelf Label Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Label</label>
          <input
            type="text"
            placeholder="Enter shelf label"
            className="w-full inputfield"
            value={shelfLabel}
            onChange={(e) => setShelfLabel(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
          Add Shelf
        </button>
      </form>
    </div>
  );
};

export default AddShelf;
