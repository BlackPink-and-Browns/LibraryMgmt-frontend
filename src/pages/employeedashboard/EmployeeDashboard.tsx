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

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  const borrowedBooks = [
    {
      id: "book1",
      title: "Clean Code",
      author: "Robert C. Martin",
      shelf: "A1-05",
      due: "2024-01-15",
      daysLeft: 3,
    },
    {
      id: "book2",
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      shelf: "B2-12",
      due: "2024-01-20",
      daysLeft: 8,
    },
  ];

  const recommendedBooks = [
    {
      id: "book3",    
      title: "Design Patterns",
      author: "Gang of Four",
      rating: 4.8,
      available: true,
    },
    {
        id: "book4",
      title: "JavaScript: The Good Parts",
      author: "Douglas Crockford",
      rating: 4.6,
      available: true,
    },
    {
        id: "book5",
      title: "Refactoring",
      author: "Martin Fowler",
      rating: 4.7,
      available: false,
    },
  ];

  const recentActivity = [
    { action: "Borrowed", book: "Clean Code", date: "2023-12-18" },
    { action: "Returned", book: "You Don't Know JS", date: "2023-12-15" },
    {action: "Requested",book: "System Design Interview",date: "2023-12-10"},
  ];

  const borrowHistory = [
    {
        id:"book1",
      title: "Clean Code",
      borrowed: "2023-11-10",
      returned: "2023-12-01",
      status: "Returned" as "Returned",
    },
    {
        id:"book6",
      title: "JavaScript: The Good Parts",
      borrowed: "2023-10-15",
      returned: "2023-11-01",
      status: "Returned" as "Returned",
    },
    {
        id:"book7",
      title: "System Design Interview",
      borrowed: "2023-09-12",
      returned: "2023-10-01",
      status: "Overdue" as "Overdue",
    },
  ];

  const stats: StatCardProps[] = [
    {
      title: "Books Borrowed",
      value: 25,
      change: "+12%",
      icon: BookIcon,
      onClick: () => console.log("Books Borrowed clicked"),
      variant: "default",
    },
    {
      title: "Currently reading",
      value: 89,
      change: "+5%",
      icon: Eye,
      onClick: () => console.log("Currently Reading clicked"),
      variant: "default",
    },
    {
      title: "Requested books",
      value: 45,
      change: "+2%",
      icon: Bookmark,
      onClick: () => console.log("Requested clicked"),
      variant: "default",
    },
    {
      title: "Overdue Notice",
      value: 3,
      icon: Clock,
      variant: "danger",
      onClick: () => console.log("Viewing overdue books"),
    },
  ];

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
