import type { AuthorWithBooks } from "./dataTypes";
import type { Book} from "./dataTypes";

export const dummyBookCards: Book[] = [
  {
    id: 1,
    isbn: "978-3-16-148410-0",
    title: "The Art of Imagination",
    description: "A journey through a mystical land where imagination becomes reality.",
    cover_image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80",
    genres: [
      { id: 1, name: "Fantasy" },
      { id: 2, name: "Adventure" }
    ],
    authors: [
      { id: 1, name: "Jane Doe" }
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        content: "Absolutely magical! A must-read for fantasy lovers.",
        employee: { id: 101, name: "Alice Smith" }
      },
      {
        id: 2,
        rating: 4,
        content: "Creative world-building and engaging characters.",
        employee: { id: 102, name: "Bob Johnson" }
      }
    ],
    copies: [
      { id: 1, shelf: "A1", is_available: true },
      { id: 2, shelf: "A2", is_available: true }
    ]
  },
  {
    id: 2,
    isbn: "978-0-14-044913-6",
    title: "Winds of Eternity",
    description: "In a world governed by time loops, one man's memories could change everything.",
    cover_image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80",
    genres: [
      { id: 3, name: "Science Fiction" },
      { id: 4, name: "Drama" }
    ],
    authors: [
      { id: 2, name: "Michael Hart" }
    ],
    reviews: [
      {
        id: 3,
        rating: 4,
        content: "A mind-bending journey through time.",
        employee: { id: 103, name: "Charlie Lee" }
      },
      {
        id: 4,
        rating: 5,
        content: "Brilliant concept and execution.",
        employee: { id: 104, name: "Dana White" }
      }
    ],
    copies: [
      { id: 3, shelf: "B1", is_available: false },
      { id: 4, shelf: "B2", is_available: false }
    ]
  },
  {
    id: 3,
    isbn: "978-0-7432-7356-5",
    title: "The Forgotten Code",
    description: "A cryptographer uncovers a deadly conspiracy hidden in plain sight.",
    cover_image: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=500&q=80",
    genres: [
      { id: 5, name: "Thriller" },
      { id: 6, name: "Mystery" }
    ],
    authors: [
      { id: 3, name: "Laura Mitchell" }
    ],
    reviews: [
      {
        id: 5,
        rating: 5,
        content: "Edge-of-your-seat suspense from start to finish.",
        employee: { id: 105, name: "Eve Martinez" }
      },
      {
        id: 6,
        rating: 4,
        content: "Clever plot twists and strong characters.",
        employee: { id: 106, name: "Frank Green" }
      }
    ],
    copies: [
      { id: 5, shelf: "C1", is_available: true },
      { id: 6, shelf: "C2", is_available: true }
    ]
  },
  {
    id: 4,
    isbn: "978-1-4028-9462-6",
    title: "Beneath the Ocean Sky",
    description: "Two souls from different worlds find love in a coastal village during wartime.",
    cover_image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=500&q=80",
    genres: [
      { id: 7, name: "Romance" },
      { id: 8, name: "Historical Fiction" }
    ],
    authors: [
      { id: 4, name: "Amira Khan" }
    ],
    reviews: [
      {
        id: 7,
        rating: 4,
        content: "A touching story of love and resilience.",
        employee: { id: 107, name: "Grace Kim" }
      }
    ],
    copies: [
      { id: 7, shelf: "D1", is_available: true }
    ]
  },
  {
    id: 5,
    isbn: "978-0-525-53892-6",
    title: "Digital Gods",
    description: "In a future ruled by AI overlords, a hacker dares to challenge the code of control.",
    cover_image: "https://images.unsplash.com/photo-1581090700227-1e8bfe263901?auto=format&fit=crop&w=500&q=80",
    genres: [
      { id: 9, name: "Cyberpunk" },
      { id: 10, name: "Dystopian" }
    ],
    authors: [
      { id: 5, name: "Elena Brooks" }
    ],
    reviews: [
      {
        id: 8,
        rating: 5,
        content: "A chilling vision of the future.",
        employee: { id: 108, name: "Henry Patel" }
      },
      {
        id: 9,
        rating: 4,
        content: "Intense and thought-provoking.",
        employee: { id: 109, name: "Ivy Chen" }
      }
    ],
    copies: [
      { id: 8, shelf: "E1", is_available: false },
      { id: 9, shelf: "E2", is_available: false }
    ]
  },
  {
    id: 6,
    isbn: "978-0-06-231609-7",
    title: "Whispers in the Wind",
    description: "A poetic tale of loss, love, and the lingering sounds of memory.",
    cover_image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=500&q=80",
    genres: [
      { id: 4, name: "Drama" },
      { id: 11, name: "Literary Fiction" }
    ],
    authors: [
      { id: 6, name: "Tomás Rivera" }
    ],
    reviews: [
      {
        id: 10,
        rating: 4,
        content: "Beautifully written and deeply moving.",
        employee: { id: 110, name: "Jackie Wu" }
      }
    ],
    copies: [
      { id: 10, shelf: "F1", is_available: true }
    ]
  },
  {
    id: 7,
    isbn: "978-1-250-08080-5",
    title: "Crimson Shadows",
    description: "A haunted manor, a cursed family, and secrets buried in blood.",
    cover_image: "https://images.unsplash.com/photo-1601758123927-196d1d89d6fe?auto=format&fit=crop&w=500&q=80",
    genres: [
      { id: 12, name: "Horror" },
      { id: 13, name: "Supernatural" }
    ],
    authors: [
      { id: 7, name: "Sophie Grant" }
    ],
    reviews: [
      {
        id: 11,
        rating: 3,
        content: "Creepy atmosphere but pacing was slow.",
        employee: { id: 111, name: "Kyle Brown" }
      }
    ],
    copies: [
      { id: 11, shelf: "G1", is_available: true }
    ]
  },
  {
    id: 8,
    isbn: "978-0-345-39180-3",
    title: "Echoes of the Ancients",
    description: "An archaeologist races against time to unlock the truth behind ancient relics.",
    cover_image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80",
    genres: [
      { id: 14, name: "Historical" },
      { id: 2, name: "Adventure" }
    ],
    authors: [
      { id: 8, name: "Richard Ngugi" }
    ],
    reviews: [
      {
        id: 12,
        rating: 5,
        content: "A thrilling adventure with rich historical detail.",
        employee: { id: 112, name: "Liam Davis" }
      }
    ],
    copies: [
      { id: 12, shelf: "H1", is_available: false },
      { id: 13, shelf: "H2", is_available: false }
    ]
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
          { id: 1, shelf: "A1", is_available: true },
          { id: 2, shelf: "B3", is_available: false }
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
          { id: 3, shelf: "C2", is_available: true },
          { id: 4, shelf: "D1", is_available: true }
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
          { id: 5, shelf: "E4", is_available: false },
          { id: 6, shelf: "E5", is_available: true }
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
          { id: 7, shelf: "F1", is_available: true },
          { id: 8, shelf: "F2", is_available: true }
        ]
      }
    ]
  }
];
