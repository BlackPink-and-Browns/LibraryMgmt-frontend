import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import StatCard from "../../components/statcard";
import BorrowedBooks from "../../components/BorrowedBooks";
import BorrowHistory from "../../components/BorrowHistory";
import Recommendations from "../../components/Recommendations";
import { BarChart, Book, Bookmark, BookOpen, Box, Clock, Eye, } from "lucide-react";

export default function EmployeeDashboard (){
    const navigate = useNavigate();
  const borrowedBooks = [
    { 
      id: "clean-code",
      title: "Clean Code", 
      author: "Robert C. Martin", 
      dueDate: "2024-01-15", 
      daysLeft: 3,
      shelf: "A1-05"
    },
    { 
      id: "pragmatic-programmer",
      title: "The Pragmatic Programmer", 
      author: "Andrew Hunt", 
      dueDate: "2024-01-20", 
      daysLeft: 8,
      shelf: "B2-12"
    },
  ];

  const recommendedBooks = [
    { title: "Design Patterns", author: "Gang of Four", rating: 4.8, available: true },
    { title: "JavaScript: The Good Parts", author: "Douglas Crockford", rating: 4.6, available: true },
    { title: "Refactoring", author: "Martin Fowler", rating: 4.7, available: false },
  ];

  const recentActivity = [
    { action: "Borrowed", book: "Clean Code", date: "2023-12-18" },
    { action: "Returned", book: "You Don't Know JS", date: "2023-12-15" },
    { action: "Requested", book: "System Design Interview", date: "2023-12-10" },
  ];

  // Demo borrow history
  const borrowHistory = [
    {
      id: "clean-code",
      title: "Clean Code",
      borrowDate: "2023-11-10",
      returnDate: "2023-12-01",
      status: "Returned"
    },
    {
      id: "js-good-parts",
      title: "JavaScript: The Good Parts",
      borrowDate: "2023-10-15",
      returnDate: "2023-11-01",
      status: "Returned"
    },
    {
      id: "system-design",
      title: "System Design Interview",
      borrowDate: "2023-09-12",
      returnDate: "2023-10-01",
      status: "Overdue"
    },
  ];

const stats: {
  title: string;
  value: number;
  change?: string;
  icon: React.ElementType;
  onClick?: () => void;
  variant?: "default" | "danger";
}[] = [
  {
    title: "Books Borrowed",
    value: 25,
    change: "+12%",
    icon: Book,
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

    return (<>
    
        <Header heading="Employee Dashboard" description="Welcome back!manage your books and discover new ones">
            <div></div>
        </Header>
        <main className="p-8 min-h-screen bg-[#f3f4f6]">

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
        

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <BorrowedBooks />
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <BorrowHistory />
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <Recommendations />
        </div>
      </section>
      </main>
    </>)
}