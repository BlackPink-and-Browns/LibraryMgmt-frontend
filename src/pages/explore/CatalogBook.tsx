import { useNavigate } from "react-router-dom";
import { Button, Header } from "../../components";
import {  TrendingUp} from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import BookCard from "./CardBook";
import {dummyBookCards} from '../../types/dummyData'
import { useGetBooksListQuery } from "../../api-service/book/book.api";
import type { Book } from "../../types/dataTypes";


export default function BookCatalog (){
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState<string>("")
    const [filterValue, setFilterValue] = useState<string>("")

    const {data : allBooks} = useGetBooksListQuery({})
    console.log(allBooks)

    const opacityStyle = searchValue !== "" ? 'opacity-25' : "opacity-100"

    return (<>
        <Header heading="Book Catalog" description="Discover and borrow book from our collection">
            <Button 
                type="button" 
                variant ={{ color : "primary", size : 'large'}}
                onClick={()=> navigate(-1)}
            >
                Back to Home
            </Button>
        </Header>

        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} setFilterValue={setFilterValue}/> 

       <div className={opacityStyle}>
            <div className="">
                <div className="flex flex-row flex-1 ml-50">
                    <TrendingUp className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg p-2 h-10 w-10 text-white "/>              
                    <p className="font-bold text-3xl ml-4">Trending Books</p>
                </div>    
                
                <div className="flex flex-row flex-wrap justiify-between mx-4 md:mx-10 lg:mx-50 my-10">
                    {dummyBookCards.map((book) => (
                        <div
                        className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 my-5 px-2"
                        key={book.id}
                        >
                        <BookCard book={book} />
                        </div>
                    ))}
                    {allBooks?.map((book : Book) => (
                        <div
                        className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 my-5 px-2"
                        key={book.id}
                        >
                        <BookCard book={book} />
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="">
                <div className="flex flex-row flex-1 ml-50">
                    <p className="font-bold text-3xl ml-4">Suggested for you</p>
                </div>    
                
                <div className="flex flex-row flex-wrap mx-4 md:mx-10 lg:mx-50 ">
                    {/* {dummyBookCards.map((book) => (
                        <div
                        className="sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 my-5 px-2"
                        key={book.id}
                        >
                        <BookCard book={book} />
                        </div>
                    ))} */}
                </div>
            </div>      
       </div>
    </>)
}