import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import StatCard from '../../../components/statcard'
import { Book, BookCopy, Bookmark, BookMarked, BookPlus, List, Sheet } from 'lucide-react'

const Books = () => {
  const navigate=useNavigate()
  return (
    <div className='flex flex-col gap-2 overflow-auto '>
      <div className='flex  sticky top-0 z-50  justify-center gap-10'>
          <StatCard title='Book List' value={"90"} icon={List} onClick={()=>navigate("/admin/books/book-list")}></StatCard>
          <StatCard title='Issued Books' value={"90"} icon={BookMarked} onClick={()=>navigate("/admin/books/issued")}></StatCard>
          <StatCard title='Add Book' value={"90"} icon={Book} onClick={()=>navigate("/admin/books/add-book")}></StatCard>
          <StatCard title='Add Book By Isbn' value={"90"} icon={BookPlus} onClick={()=>navigate("/admin/books/scan-isbn")}></StatCard>
          {/* <StatCard title='Add Book Copy' value={"90"} icon={BookCopy} onClick={()=>navigate("/admin/books/add-copy")}></StatCard> */}
          <StatCard title='Bulk Upload' value={"90"} icon={Sheet} onClick={()=>navigate("/admin/books/bulk-upload")}></StatCard>
          
      </div>
      <div>
          <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Books
