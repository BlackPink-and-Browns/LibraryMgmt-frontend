import { BookIcon, Bookmark, Clock, Eye } from "lucide-react";
import type { StatCardProps } from "./types/propTypes";

const bookDb = [
  {
    id: 1,
    isbn: "978-0-13-235088-4",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    description: "A guide to producing readable, reusable, and refactorable software in the real world.",
    cover_image: "https://m.media-amazon.com/images/I/41xShlnTZTL.jpg",
    authors: [
      { id: 1, name: "Robert C. Martin" }
    ],
    genres: [
      { id: 1, name: "Technology" },
      { id: 2, name: "Programming" }
    ],
    copies: [
      { id: 101, shelf: "A1", status: "Available" }
    ],
    reviews: [
      { id: 1001, rating: 4.8, content: "A must-read for developers." }
    ]
  },
  {
    id: 2,
    isbn: "978-0-201-61622-4",
    title: "The Pragmatic Programmer",
    description: "Timeless practical programming wisdom and advice for software engineers.",
    cover_image: "https://m.media-amazon.com/images/I/41xShlnTZTL.jpg",
    authors: [
      { id: 2, name: "Andrew Hunt" },
      { id: 3, name: "David Thomas" }
    ],
    genres: [
      { id: 1, name: "Technology" },
      { id: 2, name: "Programming" }
    ],
    copies: [
      { id: 102, shelf: "B1", status: "Borrowed" }
    ],
    reviews: [
      { id: 1002, rating: 4.7, content: "Great insight and timeless principles." }
    ]
  },
  {
    id: 3,
    isbn: "978-0-7352-1129-3",
    title: "Atomic Habits",
    description: "An easy & proven way to build good habits and break bad ones.",
    cover_image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    authors: [
      { id: 4, name: "James Clear" }
    ],
    genres: [
      { id: 3, name: "Self-help" },
      { id: 4, name: "Productivity" }
    ],
    copies: [
      { id: 103, shelf: "C2", status: "Available" }
    ],
    reviews: [
      { id: 1003, rating: 4.9, content: "Life-changing habits explained simply." }
    ]
  },
  {
    id: 4,
    isbn: "978-0-13-235088-4-2",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    description: "Duplicate copy with different shelf.",
    cover_image: "https://m.media-amazon.com/images/I/41xShlnTZTL.jpg",
    authors: [
      { id: 1, name: "Robert C. Martin" }
    ],
    genres: [
      { id: 1, name: "Technology" },
      { id: 2, name: "Programming" }
    ],
    copies: [
      { id: 104, shelf: "A2", status: "Available" }
    ],
    reviews: [
      { id: 1004, rating: 4.8, content: "Still one of the best coding books." }
    ]
  },
  {
    id: 5,
    isbn: "978-0-201-61622-4-2",
    title: "The Pragmatic Programmer",
    description: "Second copy of a modern classic.",
    cover_image: "https://m.media-amazon.com/images/I/41xShlnTZTL.jpg",
    authors: [
      { id: 2, name: "Andrew Hunt" },
      { id: 3, name: "David Thomas" }
    ],
    genres: [
      { id: 1, name: "Technology" },
      { id: 2, name: "Programming" }
    ],
    copies: [
      { id: 105, shelf: "B2", status: "Borrowed" }
    ],
    reviews: [
      { id: 1005, rating: 4.7, content: "A strong second read." }
    ]
  },
  {
    id: 6,
    isbn: "978-0-7352-1129-3-2",
    title: "Atomic Habits",
    description: "Another copy of the powerful self-help guide.",
    cover_image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    authors: [
      { id: 4, name: "James Clear" }
    ],
    genres: [
      { id: 3, name: "Self-help" },
      { id: 4, name: "Productivity" }
    ],
    copies: [
      { id: 106, shelf: "C3", status: "Available" },
      { id: 107, shelf: "C3", status: "Available" },
      { id: 108, shelf: "C3", status: "Available" }
    ],
    reviews: [
      { id: 1006, rating: 4.9, content: "Even better the second time." }
    ]
  }
];





const userDb=[{
    id: 1,
    username: "adithya_sailesh",
    status: "Active",
    email:"test@gmail.com",
    profilePicUrl: "",
  },
  {
    id: 2,
    username: "Appu Kuttan",
    status: "Inactive",
    email:"test@gmail.com",
    profilePicUrl: "https://images.filmibeat.com/ph-big/2013/07/jagathy-sreekumar_137517580426.jpg",
  },
  {
    id: 3,
    username: "mohit_verma",
    status: "Active",
    email:"test@gmail.com",
    profilePicUrl: "",
  },
  {
    id: 4,
    username: "alisha_fernandez",
    status: "Inactive",
    email:"test@gmail.com",
    profilePicUrl: "",
  },
  {
    id: 5,
    username: "vishal_rao",
    status: "Active",
    email:"test@gmail.com",
    profilePicUrl: "",
  },
  {
    id: 6,
    username: "kriti_mehta",
    status: "Active",
    email:"test@gmail.com",
    profilePicUrl: "",
  },
  {
    id: 7,
    username: "naveen_joshi",
    status: "Inactive",
    email:"test@gmail.com",
    profilePicUrl: "",
  }]


  const borrowedBooksDb = [
      {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        shelf: "A1-05",
        due: "2024-01-15",
        daysLeft: 0,
      },
      {
        id: 2,
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        shelf: "B2-12",
        due: "2024-01-20",
        daysLeft: 8,
      },
      {
        id: 2,
        title: "The good Programmer",
        author: "Andrew Hunt kkk",
        shelf: "B2-72",
        due: "2024-01-20",
        daysLeft: -1,
      },
    ];
  
    const recommendedBooksDb = [
      {
        id: 3,    
        title: "Design Patterns",
        author: "Gang of Four",
        rating: 4.8,
        available: true,
      },
      {
          id: 4,
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        rating: 4.6,
        available: true,
      },
      {
          id: 5,
        title: "Refactoring",
        author: "Martin Fowler",
        rating: 4.7,
        available: false,
      },
    ];
  
    
  const borrowHistoryDb = [
      {
          id: 1,
          title: "Clean Code",
          author: "Robert C. Martin",
          cover: "https://covers.openlibrary.org/b/id/123456-L.jpg",
          borrowed: "2023-11-10",
          returned: "2023-12-01",
          status: "Returned" as "Returned",
          review: "Excellent book for software engineers.",
          rating: 5,
          borrowShelf: "A1-05",
          returnShelf: "A1-05",
          transactionId: "TXN1001",
      },
      {
          id: 6,
          title: "JavaScript: The Good Parts",
          author: "Douglas Crockford",
          cover: "https://covers.openlibrary.org/b/id/234567-L.jpg",
          borrowed: "2023-10-15",
          returned: "2023-11-01",
          status: "Returned" as "Returned",
          review: "Concise and insightful.",
          rating: 4,
          borrowShelf: "B2-12",
          returnShelf: "B2-12",
          transactionId: "TXN1002",
      },
      {
          id: 7,
          title: "System Design Interview",
          author: "Alex Xu",
          cover: "https://covers.openlibrary.org/b/id/345678-L.jpg",
          borrowed: "2023-09-12",
          returned: "2023-10-01",
          status: "Returned" as "Returned",
          review: "Helpful for interview prep.",
          rating: 3,
          borrowShelf: "C3-07",
          returnShelf: "C3-07",
          transactionId: "TXN1003",
      },
  ];
  
    
  export  {bookDb , userDb,borrowedBooksDb,borrowHistoryDb,recommendedBooksDb};
 