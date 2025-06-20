import { Button, Header } from "../../components";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminSideBar from "../../components/adminsidebar/AdminSideBar";

const AdminLayout = () => {
    const navigate = useNavigate();
    
    const isLoggedIn = () => {
        const token = localStorage.getItem("token");
        console.log("token ", token);
        return token;
    };

    if (!isLoggedIn()) {
        console.log("Not logged in.");
        return <Navigate to="/" />;
    }

    return (
        <div className="h-screen flex flex-col bg-theme-light">
            

            <Header
                
                className="sticky top-0 z-50 bg-white/80 shadow backdrop-blur-sm py-6 pl-75 flex justify-between items-center"
                heading="Admin Dashboard"
                // description="Welcome"
            >
                <Button
                    type="button"
                    variant={{ color: "primary", size: "medium" }}
                    onClick={() => navigate("/admin")}
                >
                    Back to Dashboard
                </Button>
            </Header>

            <div className="flex flex-1 overflow-hidden">
                <div className="h-full w-70 h-full overflow-hidden">
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
