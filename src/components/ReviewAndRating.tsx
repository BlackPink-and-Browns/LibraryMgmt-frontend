import { Star } from "lucide-react";
import { useState } from "react";
import Rating from "./Rating";
import ReviewInput from "./ReviewInput";
import Button from "./Button";
import Review from "./Review";

export default function ReviewAndRating (){
    

    return (<>
        <div className="bg-blue-50 flex flex-col items-left p-3 m-5">
            <p className="font-semibold text-xl text-neutral-900">Add Your Review</p>
            <Rating />
            <ReviewInput />
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