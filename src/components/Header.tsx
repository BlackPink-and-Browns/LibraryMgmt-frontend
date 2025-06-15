import type { HeaderProps } from "../types/propTypes";
//bg-clip-text --> elements background match shape's text
export default function Header ({heading, description, children} : HeaderProps) {
    return (
        <header className="flex justify-between items-center py-6 px-50 bg-white shadow">
            <div className="flex flex-col text-gray-500">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {heading}
                </h1>
                <p className="">{description}</p>
            </div>
                     
            <div className=""> 
                {children}
            </div>
        </header>
    )
}
