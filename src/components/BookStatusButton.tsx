import { BookOpen } from "lucide-react";
import type { Book } from "../types/dataTypes";
import Button from "./Button";
import type { BookStatusButtonProps } from "../types/propTypes";

export default function BookStatusButton ({book, setIsModalOpen, isModalOpen} : BookStatusButtonProps){

    async function handleBorrow (){

    }

    async function handleRequest (){

    }
    return (
        <div className="pb-15 mx-5 my-5 w-1/3">
            {book.is_available ? 
                <Button 
                    variant={{color : 'primary', size : 'medium'}}
                    type="button"
                    onClick={()=>{setIsModalOpen(true) 
                        console.log(isModalOpen)}}
                >
                    <div className="flex flex-row">
                        <BookOpen className="mx-4"/>
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