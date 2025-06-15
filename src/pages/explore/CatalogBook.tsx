import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Header from "../../components/Header";

export default function BookCatalog (){
    const navigate = useNavigate()

    return (<>
        <Header heading="Book Catalog" description="Discover and borrow book from our collection">
            <Button 
                type="button" 
                variant ={{ color : "primary", size : 'md'}}
                onClick={()=> navigate('/')}
            >
                Back to Home
            </Button>
        </Header>
        
    </>)
}