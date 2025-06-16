import React from 'react'
import "./AdminSideBar.css"
import Button from '../Button'
import SidebarNavButton from '../SidebarNavButton'
import { Book, Home, ShieldOff, Warehouse } from 'lucide-react'
const AdminSideBar = () => {
  return (
    <div className=' h-full bg-white/80 backdrop-blur-sm shadow pl-5 py-6 text-gray-600'>
    <div className='mainbox py-20'>
         <div className='flex flex-col gap-5 '>
            <SidebarNavButton label="Dashboard" to="/admin" Icon={Home} />
            <SidebarNavButton label="Books" to="/admin/books" Icon={Book} />
            <SidebarNavButton label="Shelf" to="/admin/shelf" Icon={Warehouse} />
            <SidebarNavButton label="Books" to="/admin/books" Icon={Book} />
        </div>
    </div>
   
    </div>
  )
}

export default AdminSideBar
