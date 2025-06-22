import { PencilIcon, Trash2Icon } from "lucide-react";

const BookActions = ({
  isEditing,
  handleDelete,
  handleSave,
  setIsEditing,
  handleAddCopy,
}:{isEditing:any
  handleDelete:any
  handleSave:any
  setIsEditing:any
  handleAddCopy:any}) => (
  <div className="flex flex-wrap gap-3 mt-6">
    <button
      className="bg-red-600 text-white px-4 py-2 rounded shadow flex items-center gap-2"
      onClick={handleDelete}
    >
      <Trash2Icon size={16} /> Delete Book
    </button>
    {isEditing ? (
      <button
        className="bg-green-600 text-white px-4 py-2 rounded shadow"
        onClick={handleSave}
      >
        Save
      </button>
    ) : (
      <button
        className="bg-gray-100 text-black px-4 py-2 rounded shadow flex items-center gap-2"
        onClick={() => setIsEditing(true)}
      >
        <PencilIcon size={16} /> Edit
      </button>
    )}
    <button
      className="ml-auto bg-purple-600 text-white px-4 py-2 rounded shadow"
      onClick={handleAddCopy}
    >
      + Add Copy
    </button>
  </div>
);
export default BookActions