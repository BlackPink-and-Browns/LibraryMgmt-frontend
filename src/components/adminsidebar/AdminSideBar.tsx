import React from "react";
import "./AdminSideBar.css";
import Button from "../Button";
import SidebarNavButton from "../SidebarNavButton";
import { Book, Home, ShieldOff, User, Warehouse } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AdminSideBar = () => {

  
  const navigate=useNavigate()
  const handleLogout = () => {
        localStorage.setItem("token","")
        localStorage.setItem("isLoggedIn","false")
        localStorage.setItem("role","")
        localStorage.setItem("userId","")
        toast.info("Bye Bye")
        navigate("/",{replace:true})

  };
  return (
    <div className="h-full bg-white/80 backdrop-blur-sm pl-5 py-6 text-gray-600 flex flex-col justify-between">
      <div className="mainbox ">
        <div className="flex flex-col gap-5 ">
          <SidebarNavButton label="Dashboard" to="/admin" Icon={Home} />
          <SidebarNavButton
            label="Books"
            to="/admin/books/book-list"
            Icon={Book}
          />
          <SidebarNavButton
            label="Shelf"
            to="/admin/shelf/shelf-list"
            Icon={Warehouse}
          />
          <SidebarNavButton label="Users" to="/admin/users" Icon={User} />
          <SidebarNavButton label="Explore Books" to="/explore" Icon={Book} />
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 mr-2 py-2 bg-theme-logout text-black rounded-lg transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSideBar;
