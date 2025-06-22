import { BookOpen } from "lucide-react";
import Button from "./Button";
import type { BookStatusButtonProps } from "../types/propTypes";
import { useGetAllBorrowsQuery, useGetAllOverdueListQuery } from "../api-service/book/borrow.api";
import { useCreateRequestMutation, useGetRequestsQuery, useRemoveRequestMutation } from "../api-service/book/request.api";
import { useNavigate } from "react-router-dom";

export default function BookStatusButton ({bookId, status, setIsModalOpen, isModalOpen} : BookStatusButtonProps){
    const userId = Number(localStorage.getItem('userId'))
    const navigate = useNavigate()
    //console.log('UserId, BookID : ', userId, bookId)

    const [requestBook] = useCreateRequestMutation({})
    const {data : requestedBooks, isLoading : requestsLoading, refetch : refetchRequests} = useGetRequestsQuery({})
    //console.log('Requests :', requestedBooks)
    const hasUserRequested  = requestedBooks?.find((record : any) => {       
        return record?.employeeId === userId &&
        record?.book.id === bookId &&  record?.status==='REQUESTED'
    })
    //console.log('has User Requested this book? : ', hasUserRequested)


    const {data : borrowRecord, isLoading : borrowsLoading, refetch : refetchBorrows} = useGetAllBorrowsQuery({})
    borrowsLoading ? console.log('Borrow Records Loading..') : <></>
    //console.log('Borrow Records :', borrowRecord)  
    const isUserCurrentlyHolding =borrowRecord?.records?.some((record : any) => {       
        return record?.borrowedBy.id === userId &&
        record?.bookCopy.book.id === bookId
    }) 
    //console.log('userCurrentlyHolding : ', isUserCurrentlyHolding)

    //if overdue
    const {data : overdueRecords, isLoading : overduesLoading } = useGetAllOverdueListQuery({})
    overduesLoading ? console.log('Overudes Loading..') : <></>
   // console.log('Overudue Records :', overdueRecords)
    const ifOverdue =overdueRecords?.records?.some((record : any) => {       
        return record?.borrowedBy.id === userId
    }) 
    //console.log("If Overdue: ", ifOverdue)

    const [removeBookRequests] = useRemoveRequestMutation();
    async function handleCancelRequest (){
        try {
        await removeBookRequests([hasUserRequested?.id]); // book.id is the waitlist ID
      } catch (err) {
        console.error("Error removing request", err);
      }
    }

    function handleBorrow (){
        console.log('Modal Open: ',isModalOpen)
        setIsModalOpen(true)
        refetchBorrows()
    }

    async function handleRequest (){
        requestBook(bookId).unwrap()
        .then((response) => {
            console.log("Response : ", response)
            refetchRequests()
        }).catch((error) => {
            console.log("Error in requesting :", error)
        })
    }


    return (
        <div className="">
            {
                isUserCurrentlyHolding ? 
                <Button 
                    variant={{color : 'primary', size : 'medium'}}
                    type="button"
                    onClick={() =>{ navigate(`/dashboard/returnbook/${bookId}`)}}
                >                         
                    <p>Return Book</p>                        
                </Button> : 
                status ? 
                <Button 
                    variant={{color : 'primary', size : 'medium'}}
                    type="button"
                    onClick={handleBorrow}
                    disabled={ifOverdue}
                >
                    <div className="flex flex-row justify-center pr-2">
                        <BookOpen className="mx-2"/>
                        <p >Borrow</p>
                    </div>                       
                </Button> 
                :
                hasUserRequested ? 
                 <Button 
                    variant={{color : 'ternary', size : 'medium'}}
                    type="button"
                    onClick={handleCancelRequest}
                >                         
                    <p>Cancel Request</p>                        
                </Button> :
                <Button 
                    variant={{color : 'secondary', size : 'medium'}}
                    type="button"
                    onClick={handleRequest}
                >                         
                    <p>Request Book </p>                        
                </Button>              
            }                                                                              
        </div>
    )
}