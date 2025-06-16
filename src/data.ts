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
  },
  {
    id: 2,
    username: "neha_kapoor",
    status: "Inactive",
  },
  {
    id: 3,
    username: "mohit_verma",
    status: "Active",
  },
  {
    id: 4,
    username: "alisha_fernandez",
    status: "Inactive",
  },
  {
    id: 5,
    username: "vishal_rao",
    status: "Active",
  },
  {
    id: 6,
    username: "kriti_mehta",
    status: "Active",
  },
  {
    id: 7,
    username: "naveen_joshi",
    status: "Inactive",
  }]



  export  {bookDb , userDb};
 