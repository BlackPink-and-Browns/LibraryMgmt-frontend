import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login, BookCard, BookCatalog, ExploreLayout, NotFound } from './pages'

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
  }])
  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  )
}

export default App
