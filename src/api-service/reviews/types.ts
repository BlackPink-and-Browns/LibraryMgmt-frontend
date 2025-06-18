export interface ReviewPayload {
    rating : number
    book_id : number
    employee_id : number
    content : string
}

export interface ReviewResponse {
    status : number
}