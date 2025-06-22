import { useNavigate } from "react-router-dom";
import { Badge, Button, Header, RatingStar } from "../../components";
import { BookOpen, Eye } from "lucide-react";
import Title from "../../components/Title";
import type { BookCardProps } from "../../types/propTypes";
import type { Author, BookCopy, Review } from "../../types/dataTypes";
import BookStatusButton from "../../components/BookStatusButton";
import { useState } from "react";
import BorrowModal from "./BorrowModal";

export default function BookCard({ book, type }: BookCardProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

    const authors = book.authors?.map((author : Author) => author.name).join(', ')   
    const totalRatings = book?.reviews?.length;
    const averageRating = totalRatings > 0
      ? book?.reviews?.reduce((sum : number, review : Review) => sum + review.rating, 0) / totalRatings
      : 0;
    const widthClass = type === "chatbot" ? "w-1/2" : "w-full";
    return (<>
        <BorrowModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            copies = {book.copies ?? []}
        />

        <div className={`bg-white rounded-lg shadow-lg mr-8 hover:scale-105 duration-700 ${widthClass} h-150`}>           
            <div className="p-8 rounded-lg">
                <img 
                    src={book.cover_image} alt={book.title} 
                    className="rounded-lg w-full h-75 "/>
            </div>

        <div className="flex flex-row justify-between mx-7">
          <Badge status={book.is_available} />
          <RatingStar
            averageRating={Number(averageRating.toFixed(1))}
            totalRatings={totalRatings}
          />
        </div>

        <Title title={book.title} author={authors} variant="sm" />

        <div className="flex flex-row items-center justify-center ml-7 pb-3">
          <div className="mr-3">
            <BookStatusButton
              bookId={book.id}
              status={book.is_available}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>

          <div className="">
            <Button
              type="button"
              onClick={() => navigate(`details/${book.id}`)}
              variant={{ color: "ternary", size: "small" }}
            >
              <div className="flex flex-row items-center justify-center text-blue-500 px-2">
                <Eye className="ml-1" />
                <p> Details </p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
