import { type ButtonProps } from '../types/propTypes'

function Button ({
    children, 
    variant, 
    type,
    onClick,
    disabled,
    
} : ButtonProps) {
   
    const buttonColor = variant.color === 'primary' ?
           'bg-theme-dark text-white px-4 py-2' :
           variant.color === 'secondary' ? 'bg-green-600 text-white ' : variant.color === 'logout'? 'bg-theme-logout text-white px-4 py-2':'bg-slate-50  border border-blue-500 text-blue-500'
    
    const buttonSize = variant.size === 'large' ? 
           ' w-full sm:w-1/2 md:w-2/3 lg:w-3/3' : variant.size == 'medium' ? 
            'w-40 sm:w-1/3 md:w-1/2 lg:w-3/4' : 'w-32 sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-3/4'

    return (
        <div className='group relative inline-block'>
            {disabled && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">
                You have to return the overdue books before you can borrow another.
                </span>
            )}

        <div className={`rounded-lg px-4 py-4  flex h-13 items-center justify-center font-bold ${buttonColor} ${buttonSize}  `}>
                <button 
                    type={type}  
                    disabled={disabled}
                    onClick={onClick}  
                    className='cursor-pointer disabled:cursor-not-allowed '         
                >
                    {children}
                </button>
            </div>
        </div>
        
        
    )
}

export default Button
