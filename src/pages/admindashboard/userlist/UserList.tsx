import React from 'react'
import AdminItemTile from '../../../components/AdminItemTile'
import { userDb } from '../../../data'
import { useNavigate } from 'react-router-dom'

const UserList = () => {
  const users=userDb
  const navigate=useNavigate()
  return (
     <div className="max-w-4xl mx-auto mt-10 space-y-4 bg-white p-5 shadow-md rounded-xl">
          {users.map((user, index) => (
            <AdminItemTile item={user} type="user" onClick={() => navigate(`/admin/users/${user.id}`)} />

    
          ))}
    </div>
  )
}

export default UserList
