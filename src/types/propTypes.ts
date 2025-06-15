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
    children : React.ReactNode
}

export interface SearchBarProps{
    searchValue : string
    setSearchValue : React.Dispatch<React.SetStateAction<string>>
    setFilterValue : React.Dispatch<React.SetStateAction<string>>

    children ?: React.ReactNode

}