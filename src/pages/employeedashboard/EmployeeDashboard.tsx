import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import StatCard from "../../components/statcard";
import BorrowedBooks from "../../components/BorrowedBooks";
import BorrowHistory from "../../components/BorrowHistory";
import Recommendations from "../../components/Recommendations";
import {
  Book as BookIcon,
  Bookmark,
  Clock,
  Eye,
} from "lucide-react";
import type { Book, StatCardProps } from "../../types/propTypes";
import DashboardNavButtons from "../../components/DashboardNavButtons";
import { borrowedBooksDb, borrowHistoryDb, recommendedBooksDb, statsDb } from "../../data";

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  const borrowedBooks = borrowedBooksDb

  const recommendedBooks = recommendedBooksDb

  
const borrowHistory = borrowHistoryDb

  const stats=statsDb

  return (
    <>
      <Header
        heading="Employee Dashboard"
        description="Welcome back!manage your books and discover new ones"
      >
        <DashboardNavButtons />
      </Header>
      <main className="px-40 py-10 min-h-screen bg-[#f3f4f6] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

       <section className="space-y-6">
  {/* Row 1: Two side-by-side cards */}
  <div className="grid gap-8 md:grid-cols-2">
    <BorrowedBooks books={borrowedBooks} />
    <Recommendations books={recommendedBooks} />
  </div>

  {/* Row 2: Full-width card */}
  <BorrowHistory  history={borrowHistory} />
</section>

      </main>
    </>
  );
}
