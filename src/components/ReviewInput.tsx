import { useState } from "react";

export default function ReviewInput (){
    const [newReview, setNewReview] = useState("");

    return (<>
        {/* <Textarea
                    placeholder="Write your review..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="mb-3"
                    rows={3}
                  /> */}
        <div>
            <textarea 
                placeholder="Write your review..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-full rounded-md border border-slate-400 bg-slate-50 px-3 py-2 text-sm "
                rows={3} 
            />
        </div>
    </>)
}