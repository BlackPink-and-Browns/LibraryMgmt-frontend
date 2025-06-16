import React from 'react'
import { Outlet } from 'react-router-dom'

const Books = () => {
  return (
    <div>
      <h1>Books List</h1>
      <Outlet></Outlet>
    </div>
  )
}

export default Books
