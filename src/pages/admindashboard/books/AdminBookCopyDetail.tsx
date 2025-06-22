import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RelocateModal from "../../../components/RelocateBook";
import { useGetBookDetailsQuery } from "../../../api-service/book/book.api";
import { useGetShelfListQuery } from "../../../api-service/shelf/shelf.api";
import { useDeleteBookCopyMutation } from "../../../api-service/bookcopy/bookcopy.api";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/ConfirmModal";

type Shelf = {
  id: number;
  label: string;
  office?: { id: number; name: string };
};

type BookCopy = {
  id: number;
  shelf?: Shelf | null;
  is_available: boolean;

};

const AdminBookCopyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading, refetch } = useGetBookDetailsQuery(id);
  console.log("expected", data);
  const { data: shelfdata } = useGetShelfListQuery({});
  const [deleteCopy] = useDeleteBookCopyMutation();
  console.log("shelfshelf", shelfdata);
  const [copyToDelete, setCopyToDelete] = useState<number | null>(null);
  console.log("copiescopies", data);
  const [copies, setCopies] = useState<BookCopy[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCopyId, setSelectedCopyId] = useState<number | null>(null);

  useEffect(() => {
    if (data?.copies) {
      setCopies(data.copies);
    }
  }, [data]);

  const handleRelocateClick = (copyId: number) => {
    setSelectedCopyId(copyId);
    setModalOpen(true);
  };

  const handleModalRelocate = (updatedShelf: any) => {
    if (selectedCopyId === null) return;
    setCopies((prev) =>
      prev.map((copy) =>
        copy.id === selectedCopyId ? { ...copy, shelf: updatedShelf } : copy
      )
    );
    setSelectedCopyId(null);
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (copyToDelete == null) return;
    try {
      await deleteCopy(copyToDelete).unwrap();
      setCopies((prev) => prev.filter((copy) => copy.id !== copyToDelete));
      toast.success("Copy deleted successfully");
    } catch (error) {
      console.error("Failed to delete book copy:", error);
      toast.error(`Failed to delete book copy. ${error?.data?.message || ""}`);
    } finally {
      setCopyToDelete(null);
    }
  };

  if (isLoading) return;
  if (error) return <div className="text-center mt-10 text-red-500"></div>;
  if (!data) return <div className="text-center mt-10 text-gray-500"></div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">
          Copies of: <span className="text-gray-800">{data.title}</span>
        </h2>
      </div>

      {copies.length === 0 ? (
        <p className="text-gray-500">No copies found for this book.</p>
      ) : (
        <div className="space-y-4">
          {copies.map((copy) => (
            <div
              key={copy.id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  Copy ID: <span className="text-purple-600">{copy.id}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Shelf:{" "}
                  {copy.shelf
                    ? `${copy.shelf.office?.name || "Unknown Office"} - ${
                        copy.shelf.label
                      }`
                    : "N/A"}
                </p>

                <p className="text-sm text-gray-500">
                  Status: {copy.is_available ? "Available" : "Issued"}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="px-3 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50 transition"
                  onClick={() => handleRelocateClick(copy.id)}
                >
                  Relocate
                </button>

                <button
                  onClick={() => setCopyToDelete(copy.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>

                <ConfirmModal
                  isOpen={copyToDelete !== null}
                  message="Are you sure you want to delete this book copy?"
                  onConfirm={handleDelete}
                  onCancel={() => setCopyToDelete(null)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedCopyId && (
        <RelocateModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedCopyId(null);
          }}
          onRelocate={handleModalRelocate}
          mode="relocate"
          id={id}
          selectedCopyId={selectedCopyId}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AdminBookCopyDetail;
