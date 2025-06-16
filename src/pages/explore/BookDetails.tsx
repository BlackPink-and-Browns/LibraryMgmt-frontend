import { useNavigate, useParams } from "react-router-dom"
import { Badge, Button, Header, RatingStar } from "../../components"
import { dummyBookCards } from "../../types/dummyData"
import type { Book, BookDetailProps } from "../../types/propTypes"
import TitleAuthor from "../../components/Title"
import { Barcode, BookOpen, MapPin, MessageSquare, NotepadText } from "lucide-react"
import Title from "../../components/Title"
import Review from "../../components/Review"
import type React from "react"

export default function BookDetails({children} : BookDetailProps){
    const navigate = useNavigate()
    const {bookId} = (useParams())
    const shelf = ["SHELF A1-05", "SHELF A2-07"]

    const book: Book | undefined = dummyBookCards.find(
        (bookCard: Book) => bookCard.book_id === Number(bookId)
    );

    return (<>
        <Header heading="Book Details">
            <Button 
                type="button" 
                variant ={{ color : "primary", size : 'large'}}
                onClick={() => navigate('/explore')}
            >
                Back to Catalog
            </Button>
        </Header>

        {
            book ? 
            <>
                <section className="m-5">
                    <div className="lg:flex flex-row md:col-span-2 lg:w-256 lg:mx-70 bg-white rounded-lg shadow-xl">
                        <div className="p-8 rounded-lg lg:w-1/2">
                            <img 
                                src={book.imageCover.href} alt={book.title} 
                                className="rounded-lg  h-110 "/>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between m-7 lg:w-128" >
                                <Badge status={book.bookStatus} variant="sm"/>
                                <RatingStar averageRating={book.ratingValues.averageRating} totalRatings={book.ratingValues.totalRatings} />
                            </div>

                            <TitleAuthor title={book.title} author={book.author} variant='lg' />

                            <div className="flex flex-row flex-wrap text-gray-600 mx-7">

                                <div className="flex flex-row my-3">
                                    <div className="flex flex-row">
                                        <NotepadText className=""/>
                                        <p className="mx-2">Genre : </p>
                                        <div className="flex flex-col text-gray-800">
                                            {
                                                book.genres.map((genre) => 
                                                <p className="">
                                                    {genre}
                                                </p>)
                                            }
                                        </div>
                                    </div>

                                    <div className="flex flex-row mx-7">
                                        <Barcode />
                                        <p className="mx-2">ISBN : </p>
                                        <p className="text-gray-800"> {book.isbn}</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-row my-3">
                                    <div className="flex flex-row">
                                        <MapPin/>
                                        <p className="mx-2">Location : </p>
                                        <div className="flex flex-col text-gray-800">
                                            {
                                                shelf.map((position) => 
                                                <p className="bg-blue-50 text-blue-800 p-1 rounded-lg my-1">
                                                    {position}
                                                </p>)
                                            }
                                        </div>
                                    </div>

                                    <div className="flex flex-row mx-7.5">
                                        <NotepadText />
                                        <p className="mx-2">Pages : </p>
                                        <p className="text-gray-800"> 200</p>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="pb-15 mx-5 my-5  w-3/4">
                                {book.bookStatus === 'Available' ? 
                                    <Button 
                                        variant={{color : 'primary', size : 'medium'}}
                                        type="button"
                                        onClick={()=>{}}
                                    >
                                        <div className="flex flex-row">
                                            <BookOpen className="mx-4"/>
                                            <p >Borrow</p>
                                        </div>                       
                                    </Button> 
                                    :
                                    <Button 
                                        variant={{color : 'secondary', size : 'medium'}}
                                        type="button"
                                        onClick={()=>{}}
                                    >                         
                                        <p>Request Book </p>                        
                                    </Button>              
                                }
                                {children}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="m-5">
                    <div className="lg:w-256 lg:mx-70 bg-white p-2 rounded-lg shadow-xl">
                        <Title title="Description" variant="lg"/>
                        <p className="px-7">
                                {book.description}
                        </p>
                    </div>
                    
                </section>

                <section className="m-5">
                    <div className="lg:flex flex-row md:col-span-2 lg:w-256 lg:mx-70 bg-white rounded-lg shadow-xl">
                        <div className="flex flex-row items-center justify-center">
                            <MessageSquare className="text-neutral-900 ml-7"/>
                            <Title title="Review and Rating" variant="lg" />
                        </div>
                        <Review />
                    </div>
                </section>
            </>
            : <p>Book Not Found</p>
        }

         
        
    </>)
}