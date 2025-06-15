import { Outlet } from "react-router-dom";

export default function ExploreLayout (){
    return (<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Outlet />
    </div>)
}