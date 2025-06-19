import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Button from "./Button";
import { LogOut, Search, User } from "lucide-react";

export default function DashboardNavButtons() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const onLogout=()=>{
        localStorage.setItem("token","")
        localStorage.setItem("isLoggedIn","false")
        localStorage.setItem("role","")
        localStorage.setItem("userId","")
        navigate("/",{replace:true})
    }


  return (
    <div className="flex gap-4 items-center">
      <Button
        variant={{ color:"primary", size: "medium" }}
        type="button"
        onClick={() => navigate(`/explore`)}
      >
        <div className="flex flex-row items-center justify-center ">
          <Search  />
        <p >Explore Books</p>
        </div>
      </Button>
      
      <Button
        variant={{ color:"logout", size: "medium" }}
        type="submit"
        onClick={onLogout}
      >
        <div className="flex flex-row items-center justify-center ">
          <LogOut/>
        <p >Logout</p>
        </div>
      </Button>

      

    </div>
  );
}

