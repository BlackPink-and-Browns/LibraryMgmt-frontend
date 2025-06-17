import { Star } from "lucide-react";
import { useState } from "react";
import Rating from "./Rating";
import ReviewInput from "./ReviewInput";
import Button from "./Button";
import Review from "./Review";

export default function ReviewAndRating (){
    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState(0);

    return (<>
        <div className="bg-blue-50 flex flex-col items-left p-3 m-5">
            <p className="font-semibold text-xl text-neutral-900">Add Your Review</p>
            <Rating value={newRating} onChange={setNewRating} />
            <ReviewInput value={newReview} onChange={setNewReview}/>
            <div className="m-3">
                <Button 
                type="submit"
                onClick={()=> {}}
                variant={{color:'primary', size:'large'}}>
                    Submit
            </Button>
            </div>
            <div className="my-2">
                <Review />
            </div>
                     
        </div>
    </>)
}