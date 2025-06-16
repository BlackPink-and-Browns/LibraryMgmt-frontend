import { useNavigate } from "react-router-dom";
import { Badge, Button, Header, RatingStar } from "../../components";
import { BookOpen, RatIcon } from "lucide-react";
import TitleAuthor from "../../components/TitleAuthor";
import type { BookCardProps } from "../../types/propTypes";


export default function BookCard ({bookCard}  : BookCardProps){

    const status = bookCard.bookStatus

    return (<>
        <div className="bg-white w-1/4 rounded-lg shadow-lg mr-8">
            
            <div className="p-8 rounded-lg">
                <img 
                    src={bookCard.imageCover.href} alt={bookCard.title} 
                    className="rounded-lg w-full  transition-transform duration-300 hover:scale-110"/>
            </div>

            <div className="flex flex-row justify-between mx-7" >
                <Badge status={status} />
                <RatingStar averageRating={4.9} totalRatings={87} />
            </div>

            <TitleAuthor title={bookCard.title} author={bookCard.author} variant='sm' />

            <div className="mx-7 pb-15">
                {status === 'Available' ? 
                    <Button 
                        variant={{color : 'primary', size : 'lg'}}
                        type="button"
                        onClick={()=>{}}
                    >
                        <div className="flex flex-row">
                            <BookOpen className="mx-4"/>
                            <p >Borrow</p>
                        </div>                       
                    </Button> 
                    :
                    <Button 
                        variant={{color : 'secondary', size : 'lg'}}
                        type="button"
                        onClick={()=>{}}
                    >                         
                        <p>Request Book </p>                        
                    </Button>              
                }
            </div>

            
        </div>
    </>)
}