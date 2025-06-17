import React from 'react'
import { useParams } from 'react-router-dom'
import AdminItemTile from '../../../components/AdminItemTile'
import { bookDb } from '../../../data'
const books=bookDb
const ShelfBooks = () => {
    const {id}=useParams()
  return (
    
    <div className="max-w-4xl mx-auto mt-10 space-y-4 bg-white p-5 shadow-md rounded-xl">
        <h1 className='text-lg font-semibold'>Book In shelf :{id}</h1>
      {books.map((book) => (
        <AdminItemTile item={book} type="book" onClick={() => navigate(`/admin/books/book-list/${book.id}`)} />
          
      ))}
    </div>
  )
}

export default ShelfBooks
