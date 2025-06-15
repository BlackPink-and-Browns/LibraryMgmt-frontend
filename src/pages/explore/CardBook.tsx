import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Header from "../../components/Header";

export default function BookCard (){
    const navigate = useNavigate()

    return (<>
        <Header heading="Book Details">
            <Button 
                type="button" 
                variant ={{ color : "primary", size : 'md'}}
                onClick={() => navigate('/explore')}
            >
                Back to Catalog
            </Button>
        </Header>
    </>)
}