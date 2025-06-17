import { useState } from "react";


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
      const handleFileUpload=()=>{
        alert("File")
      }
      return (
        <div className="min-h-screen flex justify-center items-start px-4 py-10 ">
          <form className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md space-y-6" onSubmit={handleSubmit}>
            <div>
              <h2 className="text-2xl font-bold text-purple-700">Bulk Upload Books</h2>
              <p className="text-gray-500 text-sm">Upload Excel(csv,xlsx) file with book details</p>
            </div>
    
            
              <div>
                <label className="text-sm font-medium text-gray-700">Upload File</label>
                <input
                  type="file"
                  accept=".csv, .xlsx"
                  className="mt-1 w-full inputfield bg-gray-50 hover:bg-gray-200"
                  onChange={handleFileUpload}
                />
              </div>
         
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
            >
              Submit
            </button>
          </form>
        </div>
      );
}

export default BulkUpload
