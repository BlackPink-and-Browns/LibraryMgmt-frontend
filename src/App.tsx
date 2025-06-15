

import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login'
import NotFound from './pages/notFound/NotFound'

function App() {
    const router=createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  // {
  //   path:"/employee",
  //   element:<Layout/>,  

  //   children:[

  //     {path:"",element:<EmployeeList></EmployeeList>},
  //     {path:"create" ,element:<CreateFormSection editEmpId={0}></CreateFormSection>},
  //     {path:"edit/:id",element:<CreateFormSection editEmpId={4}/>},
  //     {path:":id",element:<Details></Details>},
  //   ]
  // },
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
