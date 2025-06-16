import { type ButtonProps } from '../types/propTypes'

function Button ({
    children, 
    variant, 
    type,
    onClick
} : ButtonProps) {
   
    const buttonColor = variant.color === 'primary' ?
           'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 ' :
           variant.color === 'secondary' ? 'bg-green-600' : 'bg-slate-50  border border-blue-500'
    
    const buttonSize = variant.size === 'large' ? 
           ' w-full sm:w-1/2 md:w-1/3 lg:w-5/4 xl:w-3/3' : variant.size == 'medium' ? 
            'w-40 sm:w-40 md:w-48' : 'w-32 sm:w-28 md:w-32'

    return (
        <div className={`text-white rounded-lg px-4 py-2 flex h-13 items-center justify-center font-bold ${buttonColor} ${buttonSize}`}>
            <button 
                type={type}  
                onClick={onClick}           
            >
                {children}
            </button>
        </div>
        
    )
}

export default Button
