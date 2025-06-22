import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import StatCard from "../../components/statcard";
import BorrowedBooks from "../../components/BorrowedBooks";
import BorrowHistory from "../../components/BorrowHistory";
import Recommendations from "../../components/Recommendations";
import { Book as BookIcon, Bookmark, Clock, Eye } from "lucide-react";
import type { StatCardProps } from "../../types/propTypes";
import DashboardNavButtons from "../../components/DashboardNavButtons";
import {
  borrowedBooksDb,
  borrowHistoryDb,
  recommendedBooksDb,
} from "../../data";
import OverdueBooks from "../../components/OverdueBooksModal";
import { useState } from "react";
import RequestedBooks from "../../components/RequestedBooksModal";
import { useGetUserBorrowHistoryQuery } from "../../api-service/user/user.api";
import type { RequestedBooksProp } from "../../api-service/user/types";
import { useGetRequestsQuery } from "../../api-service/book/request.api";
import { useIfOverdueQuery } from "../../api-service/book/borrow.api";
import { useGetRecommendedQuery } from "../../api-service/book/recommended.api";
import { formatDate, getDaysLeft } from "../../utils/utils";

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const UserId = userId ? Number(userId) : 0;

  const [displayOverdueBooks, setDisplayOverdueBooks] = useState(false);
  const [displayRequestedBooks, setDisplayRequestedBooks] = useState(false);

  const { data: recommendedBooks = [] } = useGetRecommendedQuery({});
  const { data: userProfile } = useGetUserBorrowHistoryQuery({});
  const { data: requestedBooksData = [] } = useGetRequestsQuery({});
  const { data: overdueBooksData } = useIfOverdueQuery({});
  const borrowedBooks = userProfile?.borrowed_books || [];

  const borrowHistory = userProfile?.book_history || [];
  const overdueBooks = overdueBooksData?.overdued_books || [];

  
  
  const RecommendedBookDetails = recommendedBooks.map((recommendation) => {
  return {
    id: recommendation.id,
    title: recommendation?.title,
    author: recommendation?.authors?.map((author) => author.name).join(", "),
    coverImage: recommendation?.cover_image,
    rating: recommendation?.avg_rating,
    available: recommendation.is_available 
  };
});

  const borrowedBookDetails = borrowedBooks.map((borrow) => {
    const book = borrow.bookCopy?.book;
    return {
      borrowId: borrow.id,
      id: book?.id,
      title: book?.title,
      authors: book?.authors?.map((author) => author.name).join(", "),
      coverImage: book?.cover_image,
      rating: book?.avg_rating,
      shelf: borrow.bookCopy?.shelf?.label,
      status: borrow.status,
      borrowedAt: borrow.createdAt,
      due: formatDate(borrow.expires_at || "2025-06-24"),
      daysLeft: getDaysLeft(borrow.expires_at || "2025-06-24"),
    };
  });

  const borrowHistoryDetails = borrowHistory
    .filter((borrow) => borrow.status === "RETURNED")
    .map((borrow) => {
      const book = borrow.bookCopy?.book;
      return {
        id: book?.id,
        title: book?.title,
        authors: book?.authors?.map((author) => author.name).join(", "),
        coverImage: book?.cover_image,
        rating: book?.avg_rating,
        shelf: borrow.bookCopy?.shelf?.label,
        status: borrow.status,
        borrowed: formatDate(borrow.createdAt),
        returned: formatDate(borrow.returned_at),
      };
    });


  const stats: StatCardProps[] = [
    {
      title: "Books Borrowed",
      value: borrowHistory.length,
      icon: BookIcon,
      onClick: () => console.log("Books Borrowed clicked"),
      variant: "default",
    },
    {
      title: "Currently reading",
      value: borrowedBookDetails.length,
      icon: Eye,
      onClick: () => console.log("Currently Reading clicked"),
      variant: "default",
    },
    {
      title: "Requested books",
      value: requestedBooksData.filter(
        (reqbook: RequestedBooksProp) =>
          reqbook.status === "NOTIFIED" || reqbook.status === "REQUESTED"
      ).length,
      icon: Bookmark,
      onClick: () => {
        setDisplayRequestedBooks(true);
        console.log("Requested clicked");
      },
      variant: "default",
    },
    {
      title: "Overdue Notice",
      value: overdueBooks.length,
      icon: Clock,
      variant: "danger",
      onClick: () => {
        setDisplayOverdueBooks(true);
        console.log("overue books", overdueBooks);
      },
    },
  ];

  return (
    <>
      <Header
        heading="Employee Dashboard"
        description="Welcome! Manage your books and discover new ones"
      >
        <DashboardNavButtons />
      </Header>
      <main className="px-40 py-10 min-h-screen ">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              onClick={stat.onClick}
              variant={stat.variant}
            />
          ))}
        </div>
        {displayOverdueBooks && (
          <OverdueBooks
            books={overdueBooks}
            onClose={() => setDisplayOverdueBooks(false)}
          ></OverdueBooks>
        )}
        {displayRequestedBooks && (
          <RequestedBooks
            closeButton={true}
            books={requestedBooksData}
            onClose={() => setDisplayRequestedBooks(false)}
          ></RequestedBooks>
        )}

        <section className="space-y-6">
          {/* Row 1: Two side-by-side cards */}
          <div className="grid gap-8 md:grid-cols-2">
            <BorrowedBooks
              books={borrowedBookDetails}
              title="Currently Borrowed"
              description="Books you currently have checked out"
            />
            <Recommendations books={RecommendedBookDetails} />
          </div>

          {/* Row 2: Full-width card */}
          <BorrowHistory history={borrowHistoryDetails} />
        </section>
      </main>
    </>
  );
}
