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
import type {  StatCardProps } from "../../types/propTypes";
import DashboardNavButtons from "../../components/DashboardNavButtons";
import { borrowedBooksDb, borrowHistoryDb, recommendedBooksDb } from "../../data";
import OverdueBooks from "../../components/OverdueBooksModal";
import { useState } from "react";
import RequestedBooks from "../../components/RequestedBooksModal";



export default function EmployeeDashboard() {
  const navigate = useNavigate();

  localStorage.getItem("userId") 
  console.log("User ID:", localStorage.getItem("userId"));
  
  const borrowedBooks = borrowedBooksDb
  const recommendedBooks = recommendedBooksDb
  const borrowHistory = borrowHistoryDb

  const [displayOverdueBooks,setDisplayOverdueBooks] = useState(false)
  const [displayRequestedBooks, setDisplayRequestedBooks] = useState(false);

const stats: StatCardProps[] = [
      {
        title: "Books Borrowed",
        value: borrowHistory.length,
        change: "+12%",
        icon: BookIcon,
        onClick: () => console.log("Books Borrowed clicked"),
        variant: "default",
      },
      {
        title: "Currently reading",
        value: borrowedBooks.length,
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
        onClick: () => {setDisplayRequestedBooks(true); console.log("Requested clicked")},
        variant: "default",
      },
      {
        title: "Overdue Notice",
        value: borrowedBooks.filter(book => book.daysLeft <= 0).length,
        icon: Clock,
        variant: "danger",
        onClick: () => {setDisplayOverdueBooks(true); console.log("Overdue Notice clicked")},
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
      <main className="px-40 py-10 min-h-screen  ">
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
        {displayOverdueBooks && (
            <OverdueBooks onClose={() => setDisplayOverdueBooks(false)}></OverdueBooks>)}
        {displayRequestedBooks && (
            <RequestedBooks onClose={() => setDisplayRequestedBooks(false)}></RequestedBooks>
            )}    

       <section className="space-y-6">
  {/* Row 1: Two side-by-side cards */}
<div className="grid gap-8 md:grid-cols-2">
    <BorrowedBooks books={borrowedBooks} title="Currently Borrowed" description="Books you currently have checked out"/>
    <Recommendations books={recommendedBooks} />
</div>

  {/* Row 2: Full-width card */}
  <BorrowHistory  history={borrowHistory} />
</section>

      </main>
    </>
  );
}
