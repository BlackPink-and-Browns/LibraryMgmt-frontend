// components/BorrowHistory.tsx
import React from "react";
import type { BorrowHistoryProps } from "../types/propTypes";
import { Book} from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function BorrowHistory({ history ,type}: {history:BorrowHistoryProps['history'],type?:string}) {
    const admin = type==="admin"
    const navigate = useNavigate();
  return (
    <section className="bg-white p-4 rounded-xl shadow-lg ">
      <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <div
          className="p-3 rounded-lg  bg-gradient-to-br from-blue-100 to-purple-100"
        >
          <Book className="h-8 w-8 text-blue-600"/>
        </div> Borrow History</h2>
      <p className="text-sm text-gray-500 mb-4">{admin ? ("") :("Your previously borrowed books")}</p>
      <ul className="space-y-3">
        {history.map((book,index) => (
       
          <li key={index} className="flex items-center justify-between border-b-1 p-2" onClick={() =>
    admin
      ? navigate("")
      : navigate(`borrowHistory/${book.transactionId}`, { state: book })
  }>
            <div className="">
              <p className="font-medium">{book.title}</p>
              <p className="text-sm text-gray-500 ">
                Borrowed: {book.borrowed} → Returned: {book.returned}
              </p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                book.status === "Returned"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {book.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
