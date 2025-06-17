import { useNavigate, useSearchParams } from "react-router-dom";
import type { TitleProps } from "../types/propTypes";
import { authorDetails } from "../types/dummyData";

export default function Title ({title, author, variant} : TitleProps){
    const titleSize = variant === 'lg' ? 'text-4xl' : 'text-xl'
    const authorSize = variant === 'lg' ? 'text-2xl' : 'text-lg'
    const fontWeight = author ? 'font-bold' : 'font-semibold'

    const [_, setSearchParams] = useSearchParams();
     const navigate = useNavigate();

     const handleAuthorClick = () => {
        if (author){
           const authorId : number = authorDetails.find((authors) => authors.name === author) | 1
            setSearchParams({ authorId: authorId });
            navigate(`author?authorId=${authorId}`);      
        }     
    };

    return (
        <div className="flex flex-col items-left mx-7 my-3">
            <p className={`${fontWeight} text-neutral-950 ${titleSize}`}>
                {title}
            </p>
            {
                author ? 
                    <p className={`text-gray-500 ${authorSize} my-1`} onClick={handleAuthorClick}>
                        by {author}
                    </p> : 
                <></>
            }
            
        </div>
    )
}