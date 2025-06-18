import { useNavigate, useParams } from "react-router-dom";
import { FolderIcon } from "lucide-react";
import { useGetShelfListQuery } from "../../../api-service/shelf/shelf.api";

const ListShelf = () => {
  const navigate = useNavigate();
  const{id}=useParams()
  const { data: shelfData = [], isLoading } = useGetShelfListQuery({});
  console.log("shelfdata", shelfData);

  // Show loading text
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-semibold text-gray-600">
        Loading shelves...
      </div>
    );
  }

  // Group shelves by office name
  const grouped = shelfData.reduce((acc, shelf) => {
    const officeName = shelf.office?.name ?? "Unknown Office";
    if (!acc[officeName]) acc[officeName] = [];
    acc[officeName].push({ id: shelf.id, label: shelf.label });
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
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              {office}
            </h3>
            <ul className="space-y-2">
              {shelfList.map((shelf) => (
                <li
                  key={shelf.id}
                  onClick={() => navigate(`${shelf.id}`)}
                  className="flex items-center gap-2 text-gray-700 px-4 py-2 rounded cursor-pointer bg-gray-50 hover:bg-gray-200 transition-colors"
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
