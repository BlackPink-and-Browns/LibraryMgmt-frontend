
import StatCard from "../../components/statcard";
import { Outlet, useNavigate } from "react-router-dom";
import {BookOpen,ChartColumn,Rows4,User} from "lucide-react";
import Recommendations from "../../components/Recommendations";
import { recommendedBooksDb } from "../../data";
import BookAnalytics from "../../components/BookAnalytics";

const AdminDashboard = () => {
  const book = recommendedBooksDb;
  const navigate = useNavigate();

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
            value={"200"}
            icon={BookOpen}
            onClick={() => navigate("books/book-list")}
          ></StatCard>
          <StatCard
            title="Active User"
            value={"85"}
            icon={User}
            onClick={() => navigate("users")}
          ></StatCard>
          <StatCard
            title="Shelf"
            value={"45"}
            icon={Rows4}
            onClick={() => navigate("shelf/shelf-list")}
          ></StatCard>
          <StatCard
            title="Books Issued"
            value={"155"}
            icon={ChartColumn}
            onClick={() => navigate("books/issued")}
          ></StatCard>
        </div>

        <div className="flex justify-center mt-10 w-full">
          <div className="w-full max-w-7xl flex gap-6">
            {/* Recommendations - Left Side */}
            <div className="w-2/3">
              <Recommendations books={book} type="admin" />
            </div>

            {/* Book Analytics - Right Side */}
            <div className="w-1/3">
              <BookAnalytics
                popularBooks={popularBooks}
                popularGenres={popularGenres}
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
