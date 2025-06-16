import { Star } from "lucide-react";
import { useState } from "react";

export default function Rating () {
    const [newRating, setNewRating] = useState(0);

    return (
        <div className="flex flex-row my-2">
            <p>Rating : </p>
            <div className="flex mx-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => setNewRating(star)}
                        className={`h-5 w-5 m-0.5 ${star <= newRating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                    >
                        <Star className="h-full w-full" />
                    </button>
                    ))}
            </div>
        </div>
    )
}