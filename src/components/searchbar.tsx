import { Search, Barcode } from "lucide-react";
import Button from "./button/Button";
import { useNavigate } from "react-router-dom";

function SearchBar({ placeholder }: { placeholder: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 p-4">
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 p-2 border rounded-md"
      />
      <Button
        type="button"
        variant={{ color: "primary", size: "sm" }}
        onClick={() => navigate("/")}
      >
        Search
      </Button>

      <Button
        type="button"
        variant={{ color: "primary", size: "sm" }}
        onClick={() => navigate("/")}
      >
        scan isbn
      </Button>
    </div>
  );
}

export default SearchBar;
