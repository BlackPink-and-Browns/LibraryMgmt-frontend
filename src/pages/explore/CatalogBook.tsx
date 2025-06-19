import { useNavigate } from "react-router-dom";
import { Button, Header } from "../../components";
import {  TrendingUp} from "lucide-react";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import BookCard from "./CardBook";
import { useGetBooksListQuery } from "../../api-service/book/book.api";
import type { Book } from "../../types/dataTypes";


export default function BookCatalog (){
    const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState<string>("")
  const [filterValue, setFilterValue] = useState<string>("All")
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])

  const { data: allBooks } = useGetBooksListQuery({})

  // Live search filter
  useEffect(() => {
    if (!allBooks) return

    const searched = allBooks.filter((book: Book) =>
      book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      book.genres.some((genre) =>
        genre.name.toLowerCase().includes(searchValue.toLowerCase())
      ) ||
      book.authors.some((author) =>
        author.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    )

    setSearchedBooks(searched)
  }, [searchValue, allBooks])

  // Filter by genre on top of search
  useEffect(() => {
    let booksToShow = searchedBooks

    if (filterValue !== "All") {
      booksToShow = booksToShow.filter((book: Book) =>
        book.genres.some((genre) =>
          genre.name.toLowerCase().includes(filterValue.toLowerCase())
        )
      )
    }

    setFilteredBooks(booksToShow)
  }, [searchedBooks, filterValue])

  const shouldShowTrending = searchValue === "" && (filterValue === "All" || filterValue === "")

    return (<>
       <Header heading="Book Catalog" description="Discover and borrow books from our collection">
        <Button
          type="button"
          variant={{ color: "ternary", size: 'large' }}
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </Header>

      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setFilterValue={setFilterValue}
      />

      <div>
        {shouldShowTrending ? (
          <div>
            <div className="flex flex-row flex-1 ml-50">
              <TrendingUp className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg p-2 h-10 w-10 text-white" />
              <p className="font-bold text-3xl ml-4">Trending Books</p>
            </div>

            <div className="flex flex-row flex-wrap justify-between mx-4 md:mx-10 lg:mx-50 my-10">
              {allBooks?.map((book: Book) => (
                <div
                  className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 my-5 px-2"
                  key={book.id}
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-row flex-1 ml-50">
              <p className="font-bold text-3xl ml-4">Suggested for you</p>
            </div>

            <div className="flex flex-row flex-wrap mx-4 md:mx-10 lg:mx-50 my-10">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book: Book) => (
                  <div
                    className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 my-5 px-2"
                    key={book.id}
                  >
                    <BookCard book={book} />
                  </div>
                ))
              ) : (
                <p className="mx-4">No books matched your search.</p>
              )}
            </div>
          </div>
        )}
      </div>

    </>)
}