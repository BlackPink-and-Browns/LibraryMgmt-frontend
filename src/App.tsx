import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login, BookCard, BookDetails, BookCatalog, ExploreLayout, NotFound } from './pages'
import AdminLayout from './pages/adminlayout/AdminLayout'
import AdminDashboard from './pages/admindashboard/AdminDashboard'
import Addbook from './pages/admindashboard/addbook/Addbook'
import BulkUpload from './pages/admindashboard/bulkupload/BulkUpload'
import Books from './pages/admindashboard/books/Books'
import ScanIsbn from './pages/admindashboard/scanisbn/ScanIsbn'
import EmployeeDashboard from './pages/employeedashboard/EmployeeDashboard'
import ReturnBook from './pages/employeedashboard/returnbook/ReturnBook'


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
      {path:":bookId/details" ,element:<BookDetails />},
    ]
  },
  {
    path:":id/dashboard",
    element:<ExploreLayout />,
    children:[
    { path:"",element:<EmployeeDashboard/> },
    {path:"return/:bookId",element:<ReturnBook />},
    {path:"borrow-history/:bookId",element:<BookDetails />}
    ]
  },
  {
    path:"*", 
    element:<NotFound></NotFound>
  },
  {
    path:"admin",
    element:<AdminLayout/>,
    children:[
      {path:"",element:<AdminDashboard></AdminDashboard>},
      {path:"books",element:<Books/>,

        children:[
            {path:"add-book",element:<Addbook></Addbook>},
            {path:"bulk-upload",element:<BulkUpload></BulkUpload>},
            {path:"scan-isbn",element:<ScanIsbn></ScanIsbn>}
        ]
      },
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
