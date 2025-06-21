import { BookOpen } from "lucide-react";
import type { Book } from "../types/dataTypes";
import Button from "./Button";
import type { BookStatusButtonProps } from "../types/propTypes";
import { useGetAllBorrowsQuery, useGetAllOverdueListQuery } from "../api-service/book/borrow.api";
import { useCreateRequestMutation } from "../api-service/book/request.api";

export default function BookStatusButton ({bookId, status, setIsModalOpen, isModalOpen} : BookStatusButtonProps){
    const [requestBook] = useCreateRequestMutation({})

    const userId = Number(localStorage.getItem('userId'))
    //console.log('UserId, BookID : ', userId, bookId)

    const {data : borrowRecord, isLoading : borrowsLoading } = useGetAllBorrowsQuery({})
    borrowsLoading ? console.log('Borrow Records Loading..') : <></>
    console.log('Borrow Records :', borrowRecord)
    
    const isUserCurrentlyHolding =borrowRecord?.records?.some((record : any) => {       
        return record?.borrowedBy.id === userId &&
        record?.bookCopy.book.id === bookId
    }) 
    console.log('userCurrentlyHolding : ', isUserCurrentlyHolding)

    //if overdue
    const {data : overdueRecords, isLoading : overduesLoading } = useGetAllOverdueListQuery({})
    overduesLoading ? console.log('Overudes Loading..') : <></>
    console.log('Overudue Records :', overdueRecords)
    const ifOverdue =overdueRecords?.records?.some((record : any) => {       
        return record?.borrowedBy.id === userId
    }) 
    console.log("If Overdue: ", ifOverdue)
    

    function handleBorrow (){
        console.log('Modal Open: ',isModalOpen)
        setIsModalOpen(true)
    }

    async function handleRequest (){

    }

    return (
        <div className="">
            {
                isUserCurrentlyHolding ? 
                <Button 
                    variant={{color : 'ternary', size : 'medium'}}
                    type="button"
                    onClick={handleRequest}
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