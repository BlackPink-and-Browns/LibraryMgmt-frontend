import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: { 
        color : "primary" | 'secondary' | 'ternary',
        size : "sm" | 'md' | 'lg'
    } 
    children : React.ReactNode
}

export interface HeaderProps {
    heading : string
    description? : string
    children : React.ReactNode
}