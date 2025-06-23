import { useNavigate, useParams } from "react-router-dom"
import { Badge, Button, Header, RatingStar } from "../../components"

import TitleAuthor from "../../components/Title"
import { Barcode, BookOpen, MessageSquare, NotepadText } from "lucide-react"
import Title from "../../components/Title"

import ReviewAndRating from "../../components/ReviewAndRating"
import { useState } from "react"
import BorrowModal from "./BorrowModal"
import type { Author, Book, BookCopy, Genre, Review } from "../../types/dataTypes"
import { useGetBookDetailsQuery } from "../../api-service/book/book.api"
import BookStatusButton from "../../components/BookStatusButton"


type Combo = {
  id: number;
  office: string;
  shelf: string;
};

export default function BookDetails(){
    const navigate = useNavigate()
    const {bookId} = (useParams())
    console.log(Number(bookId))
    const {data : book, isLoading, isError} = useGetBookDetailsQuery(bookId)
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [borrowedCombos, setBorrowedCombos] = useState<Combo[]>([]);

    // const book: Book | undefined = dummyBookCards.find(
    //     (bookCard: Book) => bookCard.id === Number(bookId)
    // );

    const status = book?.copies ? book.copies.some((copy : BookCopy )=> copy.is_available) : false
    const authors = book?.authors.map((author : Author) => author.name).join(', ')   
    const totalRatings = book?.reviews.length ?? 0 ;
    const averageRating = totalRatings > 0
          ? book ?  book.reviews?.reduce((sum : number, review : Review) => sum + review.rating, 0) / totalRatings
          : 0 : 0;

    return (<>
        <Header heading="Book Details">
            <Button 
                type="button" 
                variant ={{ color : "ternary", size : 'large'}}
                onClick={() => navigate(-1)}
            >
                Back to Catalog
            </Button>
        </Header>

        {
            isLoading ? <div>Book Details fetching</div> : 
            book ? 
            <>
                <BorrowModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    copies = {book.copies}
                />
                <div className="flex flex-row">
                    
                    <div className="flex flex-col">
                        <section className="m-5">
                            <div className="lg:flex flex-row md:col-span-2 lg:w-256 lg:ml-70 bg-white rounded-lg shadow-xl">
                                <div className="p-8 rounded-lg lg:w-">
                                    <img 
                                        src={book.cover_image} alt={book.title} 
                                        className="rounded-lg  h-110 "/>
                                </div>

                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-between m-7 lg:w-128" >
                                        <Badge status={status} variant="sm"/>
                                        <RatingStar averageRating={averageRating} totalRatings={totalRatings} />
                                    </div>

                                    <TitleAuthor title={book.title} author={authors} authorId={book.authors[0].id} variant='lg' />

                                    <div className="flex flex-row flex-wrap text-gray-600 mx-7">

                                        <div className="flex flex-col my-3">
                                            <div className="flex flex-row">
                                                <NotepadText className=""/>
                                                <p className="mx-2">Genre : </p>
                                                <div className="flex flex-col text-gray-800">
                                                    {
                                                        book.genres.map((genre : Genre) => 
                                                        <p className="">
                                                            {genre.name}
                                                        </p>)
                                                    }
                                                </div>
                                            </div>

                                            <div className="flex flex-row my-3">
                                                <Barcode />
                                                <p className="mx-2">ISBN : </p>
                                                <p className="text-gray-800"> {book.isbn}</p>
                                            </div>
                                        </div>                                                                             
                                    </div>
                                    
                                    <div className="mx-7">
                                       <BookStatusButton 
                                            bookId={book.id}
                                            status={book.is_available}
                                            isModalOpen={isModalOpen}
                                            setIsModalOpen={setIsModalOpen}
                                        /> 
                                    </div>
                                     
                                </div>
                            </div>
                        </section>

                        <section className="m-5">
                            <div className="lg:w-256 lg:ml-70 bg-white p-2 rounded-lg shadow-xl pb-5">
                                <Title title="Description" variant="lg"/>
                                <p className="px-7">
                                        {book.description}
                                </p>
                            </div>                   
                        </section>

                        
                    </div>
                    
                    <section className="mt-5">
                        <div className="lg:flex flex-col md:col-span-2 bg-white rounded-lg shadow-xl">
                            <div className="flex flex-row items-center justify-center">
                                <MessageSquare className="text-neutral-900 ml-8"/>
                                <Title title="Review & Rating" variant="lg" />
                            </div>
                            <ReviewAndRating bookId={book?.id}/>
                        </div>
                    </section>
                </div>                              
            </>
            : <p>Book Not Found</p>
        }

         
        
    </>)
}   