export type Book = {
    id : number
    isbn : string
    title: string;
    is_available : boolean
    description : string
    cover_image: string;
    genres : Genre[]
    authors: Author[];
    reviews: Review[];
    copies?: BookCopy[]; // extended for issued view
};

export interface Author  {
    id : number
    name : string
}

export interface Genre {
    id : number
    name : string
}

export interface BookCopy {
    id : number
    shelf : string
    is_available : boolean
}

export interface Review {
    id : number
    rating : number
    content : string
    employee : {
        id : number
        name : string
    }
}

export interface AuthorWithBooks extends Author {
    books : Book[]
}

export interface ShelfType {
    id : number
    label : string
    office : string
}