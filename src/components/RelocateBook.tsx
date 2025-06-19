import React, { useState } from "react";
import { useGetShelfListQuery } from "../api-service/shelf/shelf.api";
import {
  useCreateBookCopyMutation,
  useDeleteBookCopyMutation,
  useEditBookCopyMutation,
} from "../api-service/bookcopy/bookcopy.api";

function RelocateModal(props: any) {
  const {
    isOpen,
    onClose,
    onRelocate,
    mode = "relocate",
    id: bookId, // book ID
    selectedCopyId,
    refetch,
  } = props;

  const { data: shelfData = [] } = useGetShelfListQuery({});
  const [createBookCopy, { isLoading }] = useCreateBookCopyMutation();
  const [editBookCopy] = useEditBookCopyMutation(); //for relocation
  console.log("from 1st selectedCopyId", selectedCopyId);
  const [selectedOfficeId, setSelectedOfficeId] = useState("");
  const [selectedShelfId, setSelectedShelfId] = useState("");
  const [numCopies, setNumCopies] = useState(1);

  const offices = Array.from(
    new Map(
      shelfData.map((shelf) => [
        shelf.office.id,
        { id: shelf.office.id, name: shelf.office.name },
      ])
    ).values()
  );

  const shelves = shelfData
    .filter((shelf) => String(shelf.office.id) === selectedOfficeId)
    .map((shelf) => ({ id: shelf.id, label: shelf.label }));

  async function handleSubmit() {
    if (!selectedShelfId || !selectedOfficeId) return;

    if (mode === "add") {
      try {
        console.log("from payload", selectedOfficeId);
        const payload = {
          book_id: Number(bookId),
          count: Number(numCopies),
          shelf_id: Number(selectedShelfId),
        };
        const result = await createBookCopy(payload);
        if ("error" in result) {
          console.error("API Error:", result.error);
          alert("Failed to add book copy.");
        } else {
          onRelocate(selectedOfficeId, selectedShelfId, numCopies);
          await props.refetch?.();
          onClose();
          setSelectedOfficeId("");
          setSelectedShelfId("");
          setNumCopies(1);
        }
      } catch (err) {
        console.error("Failed to add book copy:", err);
        alert("Failed to add book copy.");
      }
    } else {
      try {
        console.log("from edit ", selectedCopyId, selectedShelfId);
        const payload = {
          shelf_id: Number(selectedShelfId),
        };
        await editBookCopy({ id: selectedCopyId, data: payload }).unwrap();
        const relocatedShelf = shelfData.find(
          (s) => s.id === Number(selectedShelfId)
        );
        onRelocate(relocatedShelf); // return shelf with office attached
        setSelectedOfficeId("");
        setSelectedShelfId("");
        onClose();
      } catch (err) {
        console.error("Failed to relocate book copy:", err);
        alert("Failed to relocate book copy.");
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[380px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {mode === "add" ? "Add Book Copy" : "Relocate Book Copy"}
        </h2>

        <label className="block text-sm mb-1">Select Office</label>
        <select
          value={selectedOfficeId}
          onChange={(e) => {
            setSelectedOfficeId(e.target.value);
            setSelectedShelfId("");
          }}
          className="w-full mb-4 p-2 rounded border border-gray-300 text-sm"
        >
          <option value="">-- Select Office --</option>
          {offices.map((office) => (
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </select>

        <label className="block text-sm mb-1">Select Shelf</label>
        <select
          value={selectedShelfId}
          onChange={(e) => setSelectedShelfId(e.target.value)}
          disabled={!selectedOfficeId}
          className={`w-full mb-4 p-2 rounded border border-gray-300 text-sm ${
            !selectedOfficeId ? "bg-gray-100" : "bg-white"
          }`}
        >
          <option value="">-- Select Shelf --</option>
          {shelves.map((shelf) => (
            <option key={shelf.id} value={shelf.id}>
              {shelf.label}
            </option>
          ))}
        </select>

        {mode === "add" && (
          <>
            <label className="block text-sm mb-1">Number of Copies</label>
            <input
              type="number"
              min="1"
              value={numCopies}
              onChange={(e) => setNumCopies(Number(e.target.value))}
              className="w-full mb-4 p-2 rounded border border-gray-300 text-sm"
            />
          </>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !(selectedOfficeId && selectedShelfId)}
            className={`px-4 py-2 text-sm text-white rounded ${
              selectedOfficeId && selectedShelfId && !isLoading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed opacity-70"
            }`}
          >
            {isLoading
              ? "Adding..."
              : mode === "add"
              ? "Add Copies"
              : "Relocate"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RelocateModal;
