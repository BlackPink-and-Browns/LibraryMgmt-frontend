import { BookOpen } from "lucide-react";
import type { Book } from "../types/dataTypes";
import Button from "./Button";
import type { BookStatusButtonProps } from "../types/propTypes";
import { useGetBorrowStatusListQuery } from "../api-service/book/borrow.api";

export default function BookStatusButton ({bookId, status, setIsModalOpen, isModalOpen} : BookStatusButtonProps){
    const userId = Number(localStorage.getItem('userId'))
    //console.log('UserId, BookID : ', userId, bookId)

    const {data : borrowRecord, isLoading : borrowsLoading } = useGetBorrowStatusListQuery({})
    borrowsLoading ? console.log('Loading..') : <></>
    //console.log('Borrow Records :', borrowRecord)
    
    const userCurrentlyHolding =borrowRecord?.records?.some((record : any) => {       
        return record?.borrowedBy.id === userId &&
        record?.bookCopy.book.id === bookId
    }) 
    // console.log('userCurrentlyHolding : ', userCurrentlyHolding)

    function handleBorrow (){
        console.log('Modal Open: ',isModalOpen)
        setIsModalOpen(true)
    }

    async function handleRequest (){

    }
    return (
        <div className="">
            {
                userCurrentlyHolding ? 
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