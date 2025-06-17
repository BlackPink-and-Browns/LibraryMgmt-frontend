import { useNavigate } from "react-router-dom";
import { Badge, Button, Header, RatingStar } from "../../components";
import { BookOpen, Eye } from "lucide-react";
import Title from "../../components/Title";
import type { BookCardProps } from "../../types/propTypes";


export default function BookCard ({bookCard}  : BookCardProps){

    const status = bookCard.bookStatus
    const navigate = useNavigate()

    return (<>
        <div className="bg-white  rounded-lg shadow-lg mr-8 hover:scale-105">           
            <div className="p-8 rounded-lg">
                <img 
                    src={bookCard.imageCover.href} alt={bookCard.title} 
                    className="rounded-lg w-full h-98 transition-transform duration-300 hover:scale-110"/>
            </div>

            <div className="flex flex-row justify-between mx-7" >
                <Badge status={status} />
                <RatingStar averageRating={4.9} totalRatings={87} />
            </div>

            <Title title={bookCard.title} author={bookCard.author} variant='sm' />

            <div className="flex flex-row justify-between ml-7">
                <div className="pb-15 mr-3 w-3/4">
                    {status === 'Available' ? 
                        <Button 
                            variant={{color : 'primary', size : 'large'}}
                            type="button"
                            onClick={()=>{}}
                        >
                            <div className="flex flex-row">
                                <BookOpen className="mx-2"/>
                                <p >Borrow</p>
                            </div>                       
                        </Button> 
                        :
                        <Button 
                            variant={{color : 'secondary', size : 'large'}}
                            type="button"
                            onClick={()=>{}}
                        >                         
                            <p>Request Book </p>                        
                        </Button>              
                    }
                </div>

                <div className="">
                    <Button 
                        type="button"
                        onClick={()=> navigate(`${bookCard.book_id}/details`)} 
                        variant={{color:'ternary', size : 'small'}} >
                        <div className="flex flex-row items-center justify-center text-blue-500 px-2">
                            <Eye className="ml-1"/>
                            <p> Details </p>
                        </div>
                    </Button>
                </div>
            </div>           
        </div>
    </>)
}