import { Button, Header } from "../../components";
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import AdminSideBar from "../../components/adminsidebar/AdminSideBar";

const AdminLayout = () => {
  const navigate = useNavigate();

  const isLoggedIn = () => {
      const token = localStorage.getItem("token");
        console.log("token ", token)
        return token
     }

  if (!isLoggedIn()){
    console.log("Not logged in.")
    //when directly rendering, it is better to use navigate component
        return <Navigate to="/"/>
  }
  
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-50">

      <Header heading="Admin Dashboard" description="Welcome">
        <Button
          type="button"
          variant={{ color: "primary", size: "medium" }}
          onClick={() => navigate("/admin")}
        >
          Back to Dashboard
        </Button>
      </Header>


      <div className="flex flex-1 overflow-hidden">

        <div className="h-full w-64 h-full overflow-hidden">
          <AdminSideBar />
        </div>


        <div className="flex-1 overflow-y-auto px-5 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

