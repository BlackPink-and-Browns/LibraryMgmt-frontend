import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Header from "../../components/Header";
import SearchBar from "../../components/searchbar";

export default function EmployeeDashboard (){
    const navigate = useNavigate()

    return (<>
        <Header heading="Employee Dashboard" description="Welcome back!manage your books and discover new ones">
            <div></div>
        </Header>
        <SearchBar placeholder="Search for books, authors, or ISBNs"></SearchBar>


    </>)
}