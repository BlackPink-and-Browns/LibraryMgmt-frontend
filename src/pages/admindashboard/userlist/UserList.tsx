import React from 'react'
import AdminItemTile from '../../../components/AdminItemTile'
import { userDb } from '../../../data'
import { useNavigate } from 'react-router-dom'
import { useGetAllUserQuery } from '../../../api-service/user/user.api'

const UserList = () => {
  const users=userDb
  const{data:userDate}=useGetAllUserQuery({})
  console.log("userdata",userDate)
  const navigate=useNavigate()
  return (
     <div className="max-w-4xl mx-auto mt-10 space-y-4 bg-white p-5 shadow-md rounded-xl">
       <h2 className="text-2xl font-semibold mb-6 "> UserList</h2>
          {userDate?.map((user, index) => (
            <AdminItemTile item={user} type="user" onClick={() => navigate(`/admin/users/${user.id}`)} />

    
          ))}
    </div>
  )
}

export default UserList
