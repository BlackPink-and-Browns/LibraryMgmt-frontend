import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login, BookCard, BookCatalog, ExploreLayout, NotFound } from './pages'
import AdminLayout from './pages/adminlayout/AdminLayout'
import AdminDashboard from './pages/admindashboard/AdminDashboard'
import Addbook from './pages/admindashboard/addbook/Addbook'
import BulkUpload from './pages/admindashboard/bulkupload/BulkUpload'
import Books from './pages/admindashboard/books/Books'
import ScanIsbn from './pages/admindashboard/scanisbn/ScanIsbn'


function App() {
    const router=createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:":id/explore",
    element:<ExploreLayout />,  
    children:[
      {path:"",element:<BookCatalog />},
      {path:":bookId/details" ,element:<BookCard />},
    ]
  },
  {
    path:"*", 
    element:<NotFound></NotFound>
  },{
    path:"admin",
    element:<AdminLayout/>,
    children:[
      {path:"",element:<AdminDashboard></AdminDashboard>},
      {path:"books",element:<Books></Books>},
      {path:"add-book",element:<Addbook></Addbook>},
      {path:"bulk-upload",element:<BulkUpload></BulkUpload>},
      {path:"scan-isbn",element:<ScanIsbn></ScanIsbn>}
    ]
  }])
  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  )
}

export default App
