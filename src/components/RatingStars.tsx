import { Star } from "lucide-react";
import type { RatingProps } from "../types/propTypes";

export default function RatingStar ({averageRating, totalRatings} : RatingProps){
    return (
    <div className="bg-amber-100 text-amber-500 font-bold rounded-3xl h-10 w-32 flex flex-row items-center justify-center">
        <Star className="border-amber-500 " />
        <p className="mx-2">{averageRating}</p>
        <p>({totalRatings})</p>
    </div>)
}