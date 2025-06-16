import { Star } from "lucide-react";
import { mockReviews } from "../types/dummyData";

export default function Review (){
    return (<>
        <div className="space-y-4">
                {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <img 
                          src={review.avatar} 
                          alt={review.userName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm">{review.userName}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
                          <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
        </div>
    </>)
}