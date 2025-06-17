import { CameraIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

const ScanIsbn = () => {
  const [isbn, setIsbn] = useState("");
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isbn.trim()) return alert("Please enter ISBN");
    navigate(`/admin/books/add-book/${isbn}`);
  };

  const handleScan = () => {
    setScanning(true);
  };

  useEffect(() => {
    if (!scanning) return;

    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 300, height: 100 },
    },false);

    scanner.render(
      (decodedText: string) => {
        setIsbn(decodedText);
        scanner.clear().then(() => setScanning(false));
      },
      (error: string) => {
       
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scanning]);

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
          <CameraIcon
            className="text-purple-600 w-6 h-6 cursor-pointer"
            onClick={handleScan}
          />
        </div>

        {scanning && (
          <div className="mt-4">
            <div id="reader" className="w-full rounded border border-gray-300" />
            <p className="text-xs text-gray-500 mt-2">Point camera at barcode</p>
          </div>
        )}

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
