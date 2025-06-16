import type { TitleAuthorProps } from "../types/propTypes";

export default function TitleAuthor ({title, author, variant} : TitleAuthorProps){
    const titleSize = variant === 'lg' ? 'text-3xl' : 'text-xl'
    const authorSize = variant === 'lg' ? 'text-xl' : 'text-lg'
    return (
        <div className="flex flex-col items-left mx-7 my-3">
            <p className={`font-bold text-neutral-950 ${titleSize}`}>
                {title}
            </p>
            <p className={`text-gray-500 ${authorSize} my-1`}>
                by {author}
            </p>
        </div>
    )
}