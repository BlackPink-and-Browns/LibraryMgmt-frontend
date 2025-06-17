import { Outlet } from "react-router-dom";

export default function ExploreLayout (){
    return (
    <div className="min-h-screen bg-theme-light">
        <Outlet />
    </div>)
}