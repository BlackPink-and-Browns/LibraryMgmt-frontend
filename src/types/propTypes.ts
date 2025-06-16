import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: { 
        color : "primary" | 'secondary' | 'ternary',
        size : "small" | 'medium' | 'large'
    } 
    children : React.ReactNode
}

export interface HeaderProps {
    heading : string
    children : React.ReactNode
    description? : string
}

export interface SearchBarProps{
    searchValue : string
    setSearchValue : React.Dispatch<React.SetStateAction<string>>
    setFilterValue : React.Dispatch<React.SetStateAction<string>>
    children ?: React.ReactNode
}

export interface BadgeProps{
    status : "Not Available" | "Available"
    variant? : 'sm'
}

export interface RatingProps {
    averageRating: number;
    totalRatings: number;
}


export interface TitleProps {
    title : string
    author? : string
    variant : 'lg' | 'sm'
}

export interface BookCardProps{
    bookCard : Book
}

export interface BookDetailProps {
    children : React.ReactNode
}

export interface Book {
    book_id : number,
    isbn : string,
    title : string,
    author : string,
    genres : string[],
    description : string
    imageCover : URL
    bookStatus : "Not Available" | "Available"
    ratingValues : RatingProps
}