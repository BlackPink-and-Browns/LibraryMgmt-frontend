import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: { 
        color : "primary" | 'secondary' | 'ternary',
        size : "sm" | 'md' | 'lg'
    } 
    children : React.ReactNode
}