import { CameraIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ScanIsbn = () => {
  const [isbn, setIsbn] = useState(""); // ✅ Set initial state as empty string
  const navigate=useNavigate()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!isbn.trim()) return alert("Please enter ISBN");
    navigate(`/admin/books/add-book/${isbn}`);

  };
  const handleScan=()=>{
    alert("Camera Opening")
  }
  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-10">
      <form
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-2xl font-bold text-purple-700">Scan ISBN</h2>
          <p className="text-gray-500 text-sm">Enter or scan ISBN</p>
        </div>
          <div className="w-full flex justify-center items-center gap-2">
            <input
              type="text"
              placeholder="Enter ISBN"
              className="mt-1 w-full inputfield"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
            <CameraIcon className="text-purple-600 w-6 h-6" onClick={handleScan}/>
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

export default ScanIsbn;
