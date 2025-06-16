import React from "react";
import StatCard from "../../components/statcard";
import { Outlet, useNavigate } from "react-router-dom";
import { BookOpen, ChartColumn, Columns, List, Rows4, User } from "lucide-react";

const AdminDashboard = () => {
  const navigate=useNavigate()
  return (
    <div>
      <div className="flex flex-col gap-2 overflow-auto ">
        <div className="flex  sticky top-0 z-50  justify-center gap-10">
          <StatCard
            title="Total Books"
            value={"90"}
            icon={BookOpen}
            onClick={() => navigate("")}
          ></StatCard>
          <StatCard
            title="Active User"
            value={"85"}
            icon={User  }
            onClick={() => navigate("")}
          ></StatCard>
          <StatCard
            title="Shelf"
            value={"45"}
            icon={Rows4}
            onClick={() => navigate("")}
          ></StatCard>
          <StatCard
            title="Books Issued"
            value={"45"}
            icon={ChartColumn}
            onClick={() => navigate("")}
          ></StatCard>
          
        </div>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
