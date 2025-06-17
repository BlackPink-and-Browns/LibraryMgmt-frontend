import type { TitleProps } from "../types/propTypes";

export default function Title ({title, author, variant} : TitleProps){
    const titleSize = variant === 'lg' ? 'text-4xl' : 'text-xl'
    const authorSize = variant === 'lg' ? 'text-2xl' : 'text-lg'
    const fontWeight = author ? 'font-bold' : 'font-semibold'
    return (
        <div className="flex flex-col items-left mx-7 my-3">
            <p className={`${fontWeight} text-neutral-950 ${titleSize}`}>
                {title}
            </p>
            {
                author ? <p className={`text-gray-500 ${authorSize} my-1`}>
                by {author}
                </p> : <></>
            }
            
        </div>
    )
}