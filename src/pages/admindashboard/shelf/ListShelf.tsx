import { useState } from "react";
import { FolderIcon } from "lucide-react";

const ListShelf = () => {
  const [shelves, setShelves] = useState([
    { id: 1, office: "Main Library", label: "A-1" },
    { id: 2, office: "Main Library", label: "A-2" },
    { id: 3, office: "Branch A", label: "B-1" },
    { id: 4, office: "Branch B", label: "C-3" },
  ]);

  // Group shelves by office
  const grouped = shelves.reduce((acc, shelf) => {
    if (!acc[shelf.office]) acc[shelf.office] = [];
    acc[shelf.office].push(shelf);
    return acc;
  }, {} as Record<string, { id: number; label: string }[]>);

  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-md space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-purple-700">Shelf List</h2>
          <p className="text-gray-500 text-sm">View all shelves by office</p>
        </div>

        {Object.entries(grouped).map(([office, shelfList]) => (
          <div key={office} className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">{office}</h3>
            <ul className="space-y-2">
              {shelfList.map((shelf) => (
                <li
                  key={shelf.id}
                  className="flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-2 rounded"
                >
                  <FolderIcon className="w-4 h-4 text-purple-500" />
                  Shelf Label: <strong>{shelf.label}</strong>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListShelf;
