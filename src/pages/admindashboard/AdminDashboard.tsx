import StatCard from "../../components/statcard";
import { Outlet, useNavigate } from "react-router-dom";
import { BookOpen, ChartColumn, Rows4, User } from "lucide-react";
import Recommendations from "../../components/Recommendations";
import { recommendedBooksDb } from "../../data";
import BookAnalytics from "../../components/BookAnalytics";
import { useGetShelfCountQuery } from "../../api-service/shelf/shelf.api";
import { useGetBooksListQuery } from "../../api-service/book/book.api";
import { useGetAnalyticsQuery } from "../../api-service/analytics/analytics.api";
import RecentActivity from "../../components/RecentActivity";
import Books from "./books/Books";
import RecentlyAddedBooks from "../../components/RecentlyAddedBooks";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminDashboard = () => {
  const book = recommendedBooksDb;
  const navigate = useNavigate();
  const { data: analytics,isLoading } = useGetAnalyticsQuery({});
  if(isLoading) return <LoadingSpinner message="Loading Details.."/>
  const popularBooks = [
    { title: "Atomic Habits", borrowCount: 25 },
    { title: "1984", borrowCount: 18 },
    { title: "Sapiens", borrowCount: 15 },
  ];

  const popularGenres = [
    { genre: "Self-Help", count: 30 },
    { genre: "Science Fiction", count: 25 },
    { genre: "History", count: 20 },
  ];
  return (
    <div>
      <div className="flex flex-col gap-2 overflow-auto  items-center">
        <div className="flex  sticky top-0 z-50  justify-center gap-10">
          <StatCard
            title="Total Books"
            value={analytics?.booksCount.totalCount ?? "20"}
            icon={BookOpen}
            onClick={() => navigate("books/book-list")}
          ></StatCard>

          <StatCard
            title="Shelf"
            value={analytics?.shelvesCount.totalCount ?? "20"}
            icon={Rows4}
            onClick={() => navigate("shelf/shelf-list")}
          ></StatCard>
          <StatCard
            title="Active Users"
            value={analytics?.activeUsersCount.currentMonthCount ?? "20"}
            icon={Rows4}
            onClick={() => navigate("users")}
          ></StatCard>
          <StatCard
            title="Books Issued"
            value={analytics?.issuedBooksCount.countByStatus ?? "20"}
            icon={ChartColumn}
            onClick={() => navigate("books/issued")}
          ></StatCard>
        </div>

        <div className="flex justify-center mt-10 w-full ">
          <div className="w-full max-w-7xl flex gap-6">
            {/* Recommendations - Left Side */}
            <div className="w-2/3 flex flex-col gap-5">
              <RecentlyAddedBooks books={analytics?.recentlyAddedBooks ?? []} />
                
              <RecentActivity recentActivity={analytics?.recentActivity} />
            </div>

            {/* Book Analytics - Right Side */}
            <div className="w-1/3">
              <BookAnalytics
                popularBooks={analytics?.popularBooks ?? popularBooks}
                popularGenres={analytics?.popularGenres ?? popularGenres}
              />
            </div>
          </div>
        </div>

        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
