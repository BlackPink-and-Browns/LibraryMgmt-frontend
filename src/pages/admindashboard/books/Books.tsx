import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import StatCard from '../../../components/statcard'
import { Book, BookCopy, Bookmark, BookMarked, BookPlus, List, Sheet } from 'lucide-react'

const Books = () => {
  const navigate=useNavigate()
  const location=useLocation()
  return (
    <div className='flex flex-col gap-2 overflow-auto '>
      <div className='flex  sticky top-0 z-50  justify-center gap-10'>
          <StatCard title='Book List' value={""} icon={List} onClick={()=>navigate("/admin/books/book-list") } status={location.pathname === "/admin/books/book-list"}></StatCard>
          <StatCard title='Issued Books' value={""} icon={BookMarked} onClick={()=>navigate("/admin/books/issued")} status={location.pathname === "/admin/books/issued"}></StatCard>
          <StatCard title='Add Book' value={""} icon={Book} onClick={()=>navigate("/admin/books/add-book")}  status={location.pathname === "/admin/books/add-book"}></StatCard>
          <StatCard title='Add Book By Isbn' value={""} icon={BookPlus} onClick={()=>navigate("/admin/books/scan-isbn") }status={location.pathname === "/admin/books/scan-isbn"}></StatCard>
          {/* <StatCard title='Add Book Copy' value={"90"} icon={BookCopy} onClick={()=>navigate("/admin/books/add-copy")}></StatCard> */}
          <StatCard title='Bulk Upload' value={""} icon={Sheet} onClick={()=>navigate("/admin/books/bulk-upload") } status={location.pathname === "/admin/books/bulk-upload"}></StatCard>
          
      </div>
      <div>
          <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Books
