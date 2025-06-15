import { type ButtonProps } from '../../types/propTypes'

function Button ({children, variant, type} : ButtonProps) {
    // primary - all buttons
    //secondary - green buttons
    const buttonClass = variant === 'primary' ?
           'bg-linear-to-r from-blue-500 to-purple-500' :
           'bg-green-500'   
    return (
        <div className={buttonClass}>
            <button 
                type={type}
                
            >
                {children}
            </button>
        </div>
    )
}

export default Button