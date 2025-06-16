import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Button from "./Button";

export default function DashboardNavButtons() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();



  return (
    <div className="flex gap-4 items-center">
      <Button
        variant={{ color:"primary", size: "small" }}
        type="button"
        onClick={() => navigate("")}
      >
        <span className="flex items-center gap-2">
          <span role="img" aria-label="dashboard">📊</span> Dashboard
        </span>
      </Button>

      <Button
        variant={{ color:"ternary", size: "small" }}
        type="button"
        onClick={() => navigate(`/${id}/explore`)}
      >
        <span className="flex items-center gap-2">
          <span role="img" aria-label="books">📚</span> Explore Books
        </span>
      </Button>
    </div>
  );
}
