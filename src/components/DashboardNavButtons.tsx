import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Button from "./Button";
import { LayoutDashboard, Search, User } from "lucide-react";

export default function DashboardNavButtons() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();



  return (
    <div className="flex gap-4 items-center">
      <Button
        variant={{ color:"primary", size: "medium" }}
        type="button"
        onClick={() => navigate("")}
      >
        <div className="flex flex-row items-center justify-center text-white-500">
          <LayoutDashboard/>
        <p >DashBoard</p>
        </div>
      </Button>

      <Button
        variant={{ color:"ternary", size: "medium" }}
        type="button"
        onClick={() => navigate(`/${id}/explore`)}
      >
        <div className="flex flex-row items-center justify-center text-blue-500">
          <Search  />
        <p >Explore Books</p>
        </div>
      </Button>

    </div>
  );
}
