import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export default function Rating({ value, onChange, readOnly = false }: RatingProps) {
  return (
    <div className="flex flex-row items-center my-2">
      <p className="mr-2">Rating:</p>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange && onChange(star)}
            disabled={readOnly}
            className={`h-5 w-5 m-0.5 transition-colors ${
              star <= value ? "text-yellow-500 fill-yellow-300" : "text-gray-300"
            }`}
          >
            <Star className="h-full w-full" />
          </button>
        ))}
      </div>
    </div>
  );
}
