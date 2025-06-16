import type { BadgeProps } from "../types/propTypes";

export default function Badge ({status}: BadgeProps){
    const classname = status === 'Available' ?
        'bg-green-200 text-green-900' :
        'bg-slate-200 text-neutral-950 '
    return (
    <div className={`${classname} rounded-3xl h-10 w-32 flex items-center justify-center`}>
        <p>{status}</p>
    </div>)
}