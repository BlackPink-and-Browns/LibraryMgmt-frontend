import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login, BookCard, BookCatalog, ExploreLayout, NotFound, BookDetails } from './pages'
import AdminLayout from './pages/adminlayout/AdminLayout'
import AdminDashboard from './pages/admindashboard/AdminDashboard'
import Addbook from './pages/admindashboard/books/Addbook.tsx'
import BulkUpload from './pages/admindashboard/books/BulkUpload'
import Books from './pages/admindashboard/books/Books'
import ScanIsbn from './pages/admindashboard/books/ScanIsbn'
import Shelf from './pages/admindashboard/shelf/Shelf'
import UserList from './pages/admindashboard/userlist/UserList'
import BookList from './pages/admindashboard/books/BookList.tsx'
import AddBookCopy from './pages/admindashboard/books/AddBookCopy.tsx'
import BookDetail from './pages/admindashboard/books/BookDetail.tsx'


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
     {path:":bookId/details" ,element:<BookDetails/>},
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
      {path:"books",element:<Books/>,
        children:[
            {path:"add-book",element:<Addbook></Addbook>},
            { path: "add-book/:isbnId", element: <Addbook /> },
            { path: "add-copy", element: <AddBookCopy/> },
            {path:"bulk-upload",element:<BulkUpload></BulkUpload>},
            {path:"scan-isbn",element:<ScanIsbn></ScanIsbn>},
            {path:"book-list",element:<BookList></BookList>},
            {path:"book-list/:isbnId",element:<BookDetail></BookDetail>}
        ]
      },
      {path:"shelf",element:<Shelf></Shelf>},
      {path:"users",element:<UserList></UserList>}
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
