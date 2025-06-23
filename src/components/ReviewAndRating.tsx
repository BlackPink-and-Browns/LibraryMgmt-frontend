import { Star } from "lucide-react";
import type { ReviewProp } from "../types/propTypes";
import type { Review } from "../types/dataTypes";
import { useGetReviewsByBookIdQuery } from "../api-service/reviews/review.api";

export default function ReviewAndRating ({bookId} : ReviewProp){
 const {data : reviews, isLoading : isReviewLoading, isError} = useGetReviewsByBookIdQuery(bookId)   
    
    return (<>
      <div className="bg-blue-50 flex flex-col items-left p-3 m-2">

        <div className="my-2">{
          isReviewLoading ? <div className="mx-7"> Reviews are being loaded</div>  : 

          isError ? <div className="mx-7">Error in review fetching</div> :

          reviews?.length === 0 ? 
          <div>No reviews for this book </div> :
          
          <div className="space-y-2">
                {reviews.map((review : Review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-2 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <img 
                          src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' 
                          alt={review.employee?.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm">{review.employee?.name}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{review.content}</p>
                          {/* <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</span> */}
                        </div>
                      </div>
                    </div>
                  ))}

        </div>
      }         
      </div></div>
    </>)
}