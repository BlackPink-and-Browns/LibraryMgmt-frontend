import type { AuthorWithBooks } from "./dataTypes";
import type { Book} from "./propTypes";

export const dummyBookCards: Book[] = [
    {
        book_id: 1,
        isbn: "978-3-16-148410-0",
        title: "The Art of Imagination",
        author: "Jane Doe",
        genres: ["Fantasy", "Adventure"],
        description: "A journey through a mystical land where imagination becomes reality.",
        imageCover: new URL("https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80"),
        bookStatus: "Available",
        ratingValues: { averageRating: 4.5, totalRatings: 1243 }
    },
    {
        book_id: 2,
        isbn: "978-0-14-044913-6",
        title: "Winds of Eternity",
        author: "Michael Hart",
        genres: ["Science Fiction", "Drama"],
        description: "In a world governed by time loops, one man's memories could change everything.",
        imageCover: new URL("https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80"),
        bookStatus: "Not Available",
        ratingValues: { averageRating: 4.2, totalRatings: 876 }
    },
    {
        book_id: 3,
        isbn: "978-0-7432-7356-5",
        title: "The Forgotten Code",
        author: "Laura Mitchell",
        genres: ["Thriller", "Mystery"],
        description: "A cryptographer uncovers a deadly conspiracy hidden in plain sight.",
        imageCover: new URL("https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=500&q=80"),
        bookStatus: "Available",
        ratingValues: { averageRating: 4.7, totalRatings: 1901 }
    },
    {
        book_id: 4,
        isbn: "978-1-4028-9462-6",
        title: "Beneath the Ocean Sky",
        author: "Amira Khan",
        genres: ["Romance", "Historical Fiction"],
        description: "Two souls from different worlds find love in a coastal village during wartime.",
        imageCover: new URL("https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=500&q=80"),
        bookStatus: "Available",
        ratingValues: { averageRating: 4.1, totalRatings: 653 }
    },
    {
        book_id: 5,
        isbn: "978-0-525-53892-6",
        title: "Digital Gods",
        author: "Elena Brooks",
        genres: ["Cyberpunk", "Dystopian"],
        description: "In a future ruled by AI overlords, a hacker dares to challenge the code of control.",
        imageCover: new URL("https://images.unsplash.com/photo-1581090700227-1e8bfe263901?auto=format&fit=crop&w=500&q=80"),
        bookStatus: "Not Available",
        ratingValues: { averageRating: 4.6, totalRatings: 2120 }
    },
    {
        book_id: 6,
        isbn: "978-0-06-231609-7",
        title: "Whispers in the Wind",
        author: "Tomás Rivera",
        genres: ["Drama", "Literary Fiction"],
        description: "A poetic tale of loss, love, and the lingering sounds of memory.",
        imageCover: new URL("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=500&q=80"),
        bookStatus: "Available",
        ratingValues: { averageRating: 4.3, totalRatings: 984 }
    },
    {
        book_id: 7,
        isbn: "978-1-250-08080-5",
        title: "Crimson Shadows",
        author: "Sophie Grant",
        genres: ["Horror", "Supernatural"],
        description: "A haunted manor, a cursed family, and secrets buried in blood.",
        imageCover: new URL("https://images.unsplash.com/photo-1601758123927-196d1d89d6fe?auto=format&fit=crop&w=500&q=80"),
        bookStatus: "Available",
        ratingValues: { averageRating: 3.9, totalRatings: 457 }
    },
    {
        book_id: 8,
        isbn: "978-0-345-39180-3",
        title: "Echoes of the Ancients",
        author: "Richard Ngugi",
        genres: ["Historical", "Adventure"],
        description: "An archaeologist races against time to unlock the truth behind ancient relics.",
        imageCover: new URL("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80"),
        bookStatus: "Not Available",
        ratingValues: { averageRating: 4.4, totalRatings: 1350 }
    }
];

export const mockReviews = [
    {
      id: 1,
      userName: "Sarah Johnson",
      rating: 5,
      comment: "Excellent book! Really helped me understand clean coding principles. The examples are clear and practical.",
      date: "2024-01-15",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      userName: "Mike Chen",
      rating: 4,
      comment: "Great resource for any developer. Some concepts took time to sink in, but overall very valuable.",
      date: "2024-01-10",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      userName: "Emily Davis",
      rating: 5,
      comment: "A must-read for anyone serious about programming. Changed how I write code completely!",
      date: "2024-01-08",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    }
  ];

export const authorDetails: AuthorWithBooks[] = [
  {
    id: 1,
    name: "J.K. Rowling",
    books: [
      {
        id: 1,
        isbn: "9780439139601",
        title: "Harry Potter and the Goblet of Fire",
        description: "Harry competes in the Triwizard Tournament in his fourth year at Hogwarts.",
        cover_image: "https://covers.openlibrary.org/b/isbn/9780439139601-L.jpg",
        authors : [{ id: 1, name: "J.K Rowling" }],
        genres: [
          { id: 1, name: "Fantasy" },
          { id: 2, name: "Adventure" }
        ],
        reviews: [
          {
            id: 1,
            rating: 5,
            content: "Absolutely magical and thrilling!",
            employee: { id: 1, name: "Alice Johnson" }
          },
          {
            id: 2,
            rating: 4,
            content: "Great pace and character development.",
            employee: { id: 2, name: "Bob Smith" }
          }
        ],
        copies: [
          { id: 1, shelf: "A1", status: true },
          { id: 2, shelf: "B3", status: false }
        ]
      },
      {
        id: 2,
        isbn: "9780439358071",
        title: "Harry Potter and the Order of the Phoenix",
        description: "Harry faces new threats and joins a secret resistance group.",
        cover_image: "https://covers.openlibrary.org/b/isbn/9780439358071-L.jpg",
        authors : [{ id: 1, name: "J.K Rowling" }],
        genres: [
          { id: 1, name: "Fantasy" },
          { id: 3, name: "Drama" }
        ],
        reviews: [
          {
            id: 3,
            rating: 4,
            content: "Dark and intense. Loved the new characters.",
            employee: { id: 3, name: "Charlie Davis" }
          },
          {
            id: 4,
            rating: 5,
            content: "Excellent continuation of the series.",
            employee: { id: 4, name: "Dana White" }
          }
        ],
        copies: [
          { id: 3, shelf: "C2", status: true },
          { id: 4, shelf: "D1", status: true }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "George R. R. Martin",
    books: [
      {
        id: 3,
        isbn: "9780553573404",
        title: "A Game of Thrones",
        description: "Noble families vie for control of the Iron Throne in a land of betrayal and magic.",
        cover_image: "https://covers.openlibrary.org/b/isbn/9780553573404-L.jpg",
        authors : [{ id: 1, name: "George R. R. Martin" }],
        genres: [
          { id: 1, name: "Fantasy" },
          { id: 4, name: "Political" }
        ],
        reviews: [
          {
            id: 5,
            rating: 5,
            content: "Complex, brutal, and brilliant.",
            employee: { id: 5, name: "Eva Brown" }
          },
          {
            id: 6,
            rating: 5,
            content: "A masterpiece of fantasy politics.",
            employee: { id: 6, name: "Frank Green" }
          }
        ],
        copies: [
          { id: 5, shelf: "E4", status: false },
          { id: 6, shelf: "E5", status: true }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Suzanne Collins",
    books: [
      {
        id: 4,
        isbn: "9780439023528",
        title: "The Hunger Games",
        description: "Katniss Everdeen volunteers to take her sister's place in a brutal televised death match.",
        cover_image: "https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg",
        authors : [{ id: 1, name: "Suzanne Collins" }],
        genres: [
          { id: 5, name: "Dystopian" },
          { id: 2, name: "Adventure" }
        ],
        reviews: [
          {
            id: 7,
            rating: 5,
            content: "Gripping and emotional.",
            employee: { id: 7, name: "Grace Hall" }
          },
          {
            id: 8,
            rating: 4,
            content: "Fast-paced and thought-provoking.",
            employee: { id: 8, name: "Henry Lee" }
          }
        ],
        copies: [
          { id: 7, shelf: "F1", status: true },
          { id: 8, shelf: "F2", status: true }
        ]
      }
    ]
  }
];
