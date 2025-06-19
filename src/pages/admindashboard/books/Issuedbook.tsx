import React from 'react'
import { useNavigate } from 'react-router-dom';
import { bookDb } from '../../../data';
import AdminItemTile from '../../../components/AdminItemTile';
import { useGetBorrowListQuery } from '../../../api-service/borrow/borrow.api';

const Issuedbook = () => {
  const books=bookDb
  const navigate=useNavigate()
  const{data:borrowrecord}=useGetBorrowListQuery({})
  console.log("data",borrowrecord)

    return (
      <div className="max-w-4xl mx-auto mt-10 space-y-4 bg-white p-5 shadow-md rounded-xl">
        {books.map((book) => (
          <AdminItemTile item={book} type="book" subtype="issued" onClick={() => navigate(``)} />
  
        ))}
      </div>
    );
}

export default Issuedbook
