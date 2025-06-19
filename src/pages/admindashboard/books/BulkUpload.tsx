import { useState } from "react";

const BulkUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [summary, setSummary] = useState<{
    totalRows: number;
    successCount: number;
    failedCount: number;
  } | null>(null);
  const handleDownloadTemplate = async () => {
    try {
      const token = localStorage.getItem("token"); // Adjust if you use another key or source

      const res = await fetch(
        "https://librarymanagement-backend-f008.onrender.com/books/bulk",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "book-template.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download template.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      setFile(uploaded);
    }
  };

  const handleDownloadErrors = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://librarymanagement-backend-f008.onrender.com/books/bulk/errors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ errors }), // use the saved errors array
        }
      );

      if (!res.ok) throw new Error("Failed to download errors");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "book_bulk_upload_errors.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error file failed", err);
      alert("Failed to download error report.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file.");
      return;
    }

    // Clear previous results
    setSummary(null);
    setErrors([]);

    const formData = new FormData();
    formData.append("bulk_upload", file); // Make sure field name is correct

    try {
      setUploading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in.");
        return;
      }

      const res = await fetch(
        "https://librarymanagement-backend-f008.onrender.com/books/bulk/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert(
          `✅ Upload complete. ${result.successCount} success, ${result.failedCount} failed`
        );

        setSummary({
          totalRows: result.totalRows,
          successCount: result.successCount,
          failedCount: result.failedCount,
        });

        if (result.failedCount > 0 && result.errors) {
          setErrors(result.errors); // Save failed rows to render or download
        }
      } else {
        alert("Upload failed.");
        console.error("Upload error:", result);
      }
    } catch (err) {
      alert("Something went wrong.");
      console.error("Unexpected error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex  items-center  px-4 py-10 flex-col ">
      <div className="w-full max-w-2xl space-y-4 flex flex-col">

        <form
          className="bg-white p-8 rounded-xl shadow-md space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-start"></div>
          <div>
            <h2 className="text-2xl font-bold text-purple-700">
              Bulk Upload Books
            </h2>
            <p className="text-gray-500 text-sm">
              Upload Excel (.csv, .xlsx) file with book details
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Upload File
            </label>
            <input
              type="file"
              accept=".csv, .xlsx"
              className="mt-1 w-full p-2 border rounded bg-gray-50 hover:bg-gray-100"
              onChange={handleFileUpload}
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={uploading}
              className={`w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md transition ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? "Uploading..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-green-900 shadow-md transition "
            >
              Download Template
            </button>
          </div>
          {errors.length > 0 && (
            <button
              type="button"
              onClick={handleDownloadErrors}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Download Error Report
            </button>
          )}
        </form>
      </div>
      {summary && (
        <div className="mt-10 max-w-2xl w-full bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">
            Upload Summary
          </h3>
          <p>
            <strong>Total Rows:</strong> {summary.totalRows}
          </p>
          <p>
            <strong>Successful:</strong> {summary.successCount}
          </p>
          <p>
            <strong>Failed:</strong> {summary.failedCount}
          </p>
        </div>
      )}

      {errors.length > 0 && (
        <div className="mt-6 max-w-2xl w-full bg-red-50 border border-red-200 p-6 rounded-lg shadow overflow-x-auto">
          <h3 className="text-lg font-semibold text-red-700 mb-4">
            Upload Errors
          </h3>
          <table className="min-w-full text-sm text-left text-red-900">
            <thead className="bg-red-100 font-bold">
              <tr>
                <th className="px-4 py-2 border">Row</th>
                <th className="px-4 py-2 border">Errors</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((err, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 border">{err.row}</td>
                  <td className="px-4 py-2 border">
                    <ul className="list-disc ml-4">
                      {err.errors.map((e: string, i: number) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;
