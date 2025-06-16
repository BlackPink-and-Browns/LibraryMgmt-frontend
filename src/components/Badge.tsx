import type { BadgeProps } from "../types/propTypes";

export default function Badge ({status, variant}: BadgeProps){
    const classname = status === 'Available' ?
        'bg-green-200 text-green-900' :
        'bg-slate-200 text-neutral-950 '
    
    const size = variant ? 'h-5 w-27' : 'h-10 w-32'
    return (
    <div className={`${classname} rounded-3xl ${size} flex items-center justify-center`}>
        <p>{status}</p>
    </div>)
}