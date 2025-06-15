
import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login'
import NotFound from './pages/notFound/NotFound'
import ExploreLayout from './pages/explore/ExploreLayout'
import BookCatalog from './pages/explore/CatalogBook'
import BookCard from './pages/explore/CardBook'
import EmployeeDashboard from './pages/employeeDashboard/EmployeeDashboard'

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
    path:":id/dashboard",
    element:<ExploreLayout />,
    children:[
      {path:"",element:<EmployeeDashboard />}
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
