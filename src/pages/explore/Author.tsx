import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Button, Header } from "../../components"
import { authorDetails } from "../../types/dummyData"
import type { AuthorWithBooks, Book } from "../../types/dataTypes"
import AdminItemTile from "../../components/AdminItemTile";
import Title from "../../components/Title";
import { useGetAuthorDetailsQuery } from "../../api-service/author/author.api";


export default function AuthorDetails (){

        const {authorId} = useParams();
        const navigate = useNavigate();

        const {data : author} = useGetAuthorDetailsQuery(Number(authorId))
        console.log("Author :", author)

        return (<>
        {
            author ?
            <div className="">
                <Header heading='Author Details'>
                    <Button 
                        type="button" 
                        variant ={{ color : "primary", size : 'large'}}
                        onClick={()=> navigate(-1)}
                    >
                        Back to Home
                    </Button>
                </Header> 

                <section className="my-5 mx-30">
                    <div className="lg:w-256 lg:ml-60 bg-white p-2 rounded-lg shadow-xl">
                        <Title title={author.name} variant="lg"/>
                    </div>                   
                </section>

                <section className="my-5 mx-30">
                    <div className="lg:w-256 lg:ml-60 bg-white p-2 rounded-lg shadow-xl">
                        <Title title='Books by the Author' variant="sm"/> 
                        <section className="my-5 mx-10">
                            <div className="lg:w-220 lg:mx-2 bg-white p-4 rounded-lg shadow-xl">
                                {
                                    author?.books?.map((book: Book) => (
                                        <AdminItemTile
                                            key={book.id}
                                            item={book}
                                            type="book"
                                            onClick={() => navigate(-1)}
                                            subtype="normal"
                                        />
                                    ))
                                }
                            </div>                   
                        </section>
                    </div>                   
                </section>

                <div className="bg-white w-3/4 mx-50 my-10">
                    
                </div>
                 
            </div> 
            :  <div className="">
                <Header heading="Author Not Found">
                    <Button 
                        type="button" 
                        variant ={{ color : "primary", size : 'large'}}
                        onClick={()=> navigate(-1)}
                    >
                        Back to Home
                    </Button>
                </Header>    
               </div> 
        }
        
    </>)
}