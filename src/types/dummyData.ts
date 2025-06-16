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
