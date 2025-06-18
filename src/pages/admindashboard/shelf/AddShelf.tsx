import { useState } from "react";
import {
  useCreateShelfMutation,
  useGetShelfListQuery,
} from "../../../api-service/shelf/shelf.api";

const AddShelf = () => {
  const [officeId, setOfficeId] = useState("");
  const [shelfLabel, setShelfLabel] = useState("");

  const { data: shelfData, isLoading } = useGetShelfListQuery({});
  const [createShelf] = useCreateShelfMutation(); 
  const uniqueOffices = shelfData
    ? Array.from(new Map(shelfData.map((shelf) => [shelf.office.id, shelf.office])).values())
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!officeId || !shelfLabel.trim()) {
      return alert("Please fill in both fields");
    }

    const payload = {
      label_id: Number(shelfLabel),
      officeId: Number(officeId),
    };

    try {
      await createShelf(payload).unwrap();
      const selectedOffice = uniqueOffices.find((o) => o.id === parseInt(officeId));
      alert(`Shelf added: ${shelfLabel} in ${selectedOffice?.name}`);
      setShelfLabel("");
      setOfficeId("");
    } catch (err) {
      console.error("Error creating shelf:", err);
      alert("Something went wrong. Please try again.");
    }
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Office</label>
          {isLoading ? (
            <p className="text-sm text-gray-500">Loading offices...</p>
          ) : (
            <select
              value={officeId}
              onChange={(e) => setOfficeId(e.target.value)}
              className="w-full inputfield"
            >
              <option value="">-- Select an Office --</option>
              {uniqueOffices.map((office) => (
                <option key={office.id} value={office.id}>
                  {office.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Number</label>
          <input
            type="number"
            placeholder="Enter shelf number"
            className="w-full inputfield"
            value={shelfLabel}
            onChange={(e) => setShelfLabel(e.target.value)}
          />
        </div>
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
