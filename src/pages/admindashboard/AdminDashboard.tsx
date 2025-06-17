import React from "react";
import StatCard from "../../components/statcard";
import { Outlet, useNavigate } from "react-router-dom";
import { BookOpen, ChartColumn, Columns, List, Rows4, User } from "lucide-react";
import Recommendations from "../../components/Recommendations";
import { borrowHistoryDb, recommendedBooksDb } from "../../data";

const AdminDashboard = () => {
  const book=recommendedBooksDb
  const navigate=useNavigate()
  return (
    <div>
      <div className="flex flex-col gap-2 overflow-auto ">
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
            icon={User  }
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
            onClick={() => navigate("")}
          ></StatCard>
          
        </div>

        <div className="flex justify-center mt-10">
          <div className="w-full 2xl:w-1/2">
              <Recommendations books={book} type={"admin"}></Recommendations>
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
