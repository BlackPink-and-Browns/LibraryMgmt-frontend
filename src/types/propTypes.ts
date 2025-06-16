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

export type HistoryItem = {
  id: any;
  title: string;
  borrowed: string;
  returned: string;
  status: "Returned" | "Overdue";
};

export interface BorrowHistoryProps {
  history: HistoryItem[];
}

export type BorrowedBook = {
  id: string;
  title: string;
  author: string;
  shelf: string;
  due: string;
  daysLeft: number;
};

export interface BorrowedBooksProps {
  books: BorrowedBook[];
}

export type Recommendation = {
  id: string;
  title: string;
  author: string;
  rating: number;
  available: boolean;
};

export interface RecommendationsProps {
  books: Recommendation[];
}

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ElementType;
  onClick?: () => void;
  variant?: "default" | "danger";
}