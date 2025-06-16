import { useNavigate } from "react-router-dom"
import { Button, Header } from "../../components"

export default function BookDetails(){
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