import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Button from "./Button";
import { LogOut, Search, User } from "lucide-react";

export default function DashboardNavButtons() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const role=localStorage.getItem("role")


  
  const onLogout=()=>{
        localStorage.setItem("token","")
        localStorage.setItem("isLoggedIn","false")
        localStorage.setItem("role","")
        localStorage.setItem("userId","")
        navigate("/",{replace:true})
    }
        console.log("🚀 ~ onLogout ~ role:", role)


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
      {role==="ADMIN" && (
        <Button
        variant={{ color:"logout", size: "medium" }}
        type="submit"
        onClick={()=>navigate("/admin")}
      >
        <div className="flex flex-row items-center justify-center ">
          <LogOut/>
        <p >Back To Admin</p>
        </div>
      </Button>
      )}
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

