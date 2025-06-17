import { useNavigate } from "react-router-dom";
import { Badge, Button, Header, RatingStar } from "../../components";
import { BookOpen, Eye } from "lucide-react";
import Title from "../../components/Title";
import type { BookCardProps } from "../../types/propTypes";


export default function book ({book}  : BookCardProps){
    const navigate = useNavigate()

    const status = book.copies ? book.copies.some(copy => copy.is_available) : false
    const authors = book.authors.map((author) => author.name).join(', ')   
    const totalRatings = book.reviews.length;
    const averageRating = totalRatings > 0
      ? book.reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings
      : 0;

    return (<>
<<<<<<< Updated upstream
        <div className="bg-white  rounded-lg shadow-lg mr-8 hover:scale-105 duration-700">           
=======
        <div className="bg-white rounded-lg shadow-lg mr-8 hover:scale-105 min-w-fit duration-700">           
>>>>>>> Stashed changes
            <div className="p-8 rounded-lg">
                <img 
                    src={book.cover_image} alt={book.title} 
                    className="rounded-lg w-full h-75 "/>
            </div>

            <div className="flex flex-row justify-between mx-7" >
                <Badge status={status} />
                <RatingStar averageRating={Number(averageRating.toFixed(1))} totalRatings={totalRatings} />
            </div>

            <Title title={book.title} author={authors} variant='sm' />

            <div className="flex flex-row justify-between ml-7">
                <div className="pb-15 mr-3 w-3/4">
                    {status  ? 
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
                        onClick={()=> navigate(`${book.id}/details`)} 
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