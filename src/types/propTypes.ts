import React from "react";
import type { JSX } from "react/jsx-runtime";
import type {  Book } from "./dataTypes";

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
    status : boolean
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
    book : Book
}

export interface BookDetailProps {
    children : React.ReactNode
}

export type HistoryItem = {
  id: number;
  title: string;
  author: string;
  cover: string;
  borrowed: string;
  returned: string;
  status: "Returned" | "Overdue";
  review?: string;
  rating?: number;
  borrowShelf?: string;
  returnShelf?: string;
  transactionId?: string; // optional, for matching review route
};


export interface BorrowHistoryProps {
  history: HistoryItem[];
}

export type BorrowedBook = {
  id: number;
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
  id: number;
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