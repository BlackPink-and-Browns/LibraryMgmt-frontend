import { type ButtonProps } from '../../types/propTypes'

function Button ({children, variant, type} : ButtonProps) {
    // primary - all buttons
    //secondary - green buttons
    const buttonClass = variant === 'primary' ?
           'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 ' :
           'bg-green-500'   
    return (
        <div className={`text-white rounded-lg px-4 py-2 flex w-32 h-10 items-center justify-center ${buttonClass}`}>
            <button 
                type={type}             
            >
                {children}
            </button>
        </div>
    )
}

export default Button
