import { useNavigate } from "react-router-dom";
import { Button, Header } from "../../components";
import { MapPin, TrendingUp, Eye } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import BookCard from "./CardBook";
import {dummyBookCards} from '../../types/dummyData'

export default function BookCatalog (){
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState<string>("")
    const [filterValue, setFilterValue] = useState<string>("")

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

        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} setFilterValue={setFilterValue}/> 

        <div className="flex flex-row flex-1 ml-50">
            <TrendingUp className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg p-2 h-10 w-10 text-white "/>              
            <p className="font-bold text-3xl ml-4">Trending Books</p>
        </div>    
        
        <div className="">
            {dummyBookCards.map((book) => (
                <BookCard bookCard={book} key={book.book_id}  />
            ))}        
        </div>
    </>)
}