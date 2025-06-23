import { useNavigate} from "react-router-dom";
import type { TitleProps } from "../types/propTypes";

export default function Title ({title, author, authorId, variant} : TitleProps){
    const titleSize = variant === 'lg' ? 'text-4xl' : 'text-xl'
    const authorSize = variant === 'lg' ? 'text-2xl' : 'text-lg'
    const fontWeight = author ? 'font-bold' : 'font-semibold'
     const navigate = useNavigate();

    const handleAuthorClick = () => {
        if (authorId){         
            navigate(`/explore/author/${authorId}`);      
        }     
    };

    return (
        <div className="flex flex-col items-left mx-7 my-3">
            <p className={`${fontWeight} text-neutral-950 ${titleSize}`} title={title}>
                {title}
            </p>
            {
                author ? 
                    <p className={`text-gray-500 ${authorSize} my-1 hover:cursor-pointer`} onClick={handleAuthorClick}>
                        by {author}
                    </p> : 
                <></>
            }
            
        </div>
    )
}
